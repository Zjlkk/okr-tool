/**
 * @file Department Goal API
 * @description Get/Set department goal for a period
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period')

    if (!period) {
      return NextResponse.json(
        { success: false, error: 'Period is required' },
        { status: 400 }
      )
    }

    const goal = await prisma.departmentOKR.findUnique({
      where: {
        departmentId_period: {
          departmentId: id,
          period,
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: goal,
    })
  } catch (error) {
    console.error('Failed to fetch department goal:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch department goal' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Only leaders can set department goals
    if (session.user.role !== 'LEADER') {
      return NextResponse.json(
        { success: false, error: 'Only leaders can set department goals' },
        { status: 403 }
      )
    }

    const { id } = await params
    const { objectives, period } = await request.json()

    if (!objectives || !period) {
      return NextResponse.json(
        { success: false, error: 'Objectives and period are required' },
        { status: 400 }
      )
    }

    const goal = await prisma.departmentOKR.upsert({
      where: {
        departmentId_period: {
          departmentId: id,
          period,
        },
      },
      update: { objectives },
      create: {
        departmentId: id,
        period,
        objectives,
      },
    })

    // Mark any pending reminders as done
    await prisma.reminder.updateMany({
      where: {
        departmentId: id,
        period,
        status: 'PENDING',
      },
      data: { status: 'DONE' },
    })

    return NextResponse.json({
      success: true,
      data: goal,
    })
  } catch (error) {
    console.error('Failed to set department goal:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to set department goal' },
      { status: 500 }
    )
  }
}
