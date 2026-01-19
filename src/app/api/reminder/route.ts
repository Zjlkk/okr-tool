/**
 * @file Reminder API
 * @description Send reminder to leader to set department goal
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { toUserId, departmentId, period } = await request.json()

    if (!toUserId || !departmentId || !period) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if reminder already exists
    const existingReminder = await prisma.reminder.findFirst({
      where: {
        fromUserId: session.user.id,
        toUserId,
        departmentId,
        period,
        status: 'PENDING',
      },
    })

    if (existingReminder) {
      return NextResponse.json(
        { success: false, error: 'Reminder already sent' },
        { status: 400 }
      )
    }

    // Create reminder
    const reminder = await prisma.reminder.create({
      data: {
        fromUserId: session.user.id,
        toUserId,
        departmentId,
        period,
      },
    })

    // TODO: Send Slack notification to leader
    // This would integrate with Slack API

    return NextResponse.json({
      success: true,
      data: reminder,
    })
  } catch (error) {
    console.error('Failed to create reminder:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create reminder' },
      { status: 500 }
    )
  }
}
