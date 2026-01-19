/**
 * @file User Setup API
 * @description Set user role and department (demo mode)
 */

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { role, departmentId } = await request.json()

  if (!role || !departmentId) {
    return NextResponse.json(
      { success: false, error: 'Role and department are required' },
      { status: 400 }
    )
  }

  if (!['LEADER', 'MEMBER'].includes(role)) {
    return NextResponse.json(
      { success: false, error: 'Invalid role' },
      { status: 400 }
    )
  }

  // Demo mode: just return success
  return NextResponse.json({
    success: true,
    data: {
      id: 'demo-user-1',
      role,
      departmentId,
    },
  })
}
