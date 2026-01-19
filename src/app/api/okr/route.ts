/**
 * @file OKR API
 * @description Create and list personal OKRs
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period')

    const okrs = await prisma.personalOKR.findMany({
      where: {
        userId: session.user.id,
        ...(period ? { period } : {}),
        isArchived: false,
      },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: okrs.map((okr) => ({
        id: okr.id,
        objective: okr.objective,
        keyResults: okr.keyResults as { id: string; content: string }[],
        status: okr.status,
        period: okr.period,
      })),
    })
  } catch (error) {
    console.error('Failed to fetch OKRs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch OKRs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { okrs, period } = await request.json()

    if (!okrs || !Array.isArray(okrs) || okrs.length < 3) {
      return NextResponse.json(
        { success: false, error: 'At least 3 objectives are required' },
        { status: 400 }
      )
    }

    if (!period) {
      return NextResponse.json(
        { success: false, error: 'Period is required' },
        { status: 400 }
      )
    }

    // Delete existing draft OKRs for this period
    await prisma.personalOKR.deleteMany({
      where: {
        userId: session.user.id,
        period,
        status: 'DRAFT',
      },
    })

    // Create new OKRs
    const createdOKRs = await prisma.$transaction(
      okrs.map((okr: { objective: string; keyResults: { id: string; content: string }[] }) =>
        prisma.personalOKR.create({
          data: {
            userId: session.user.id,
            period,
            objective: okr.objective,
            keyResults: okr.keyResults,
            status: 'SUBMITTED',
          },
        })
      )
    )

    // Clear draft
    await prisma.draft.deleteMany({
      where: { userId: session.user.id },
    })

    return NextResponse.json({
      success: true,
      data: createdOKRs,
    })
  } catch (error) {
    console.error('Failed to create OKRs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create OKRs' },
      { status: 500 }
    )
  }
}
