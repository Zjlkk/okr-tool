/**
 * @file Reminder API
 * @description Send reminder to leader to set department goal (demo mode)
 */

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { toUserId, departmentId, period } = await request.json()

  if (!toUserId || !departmentId || !period) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields' },
      { status: 400 }
    )
  }

  // Demo mode: just return success
  return NextResponse.json({
    success: true,
    data: {
      id: 'reminder-demo-1',
      fromUserId: 'demo-user-1',
      toUserId,
      departmentId,
      period,
      status: 'PENDING',
    },
  })
}
