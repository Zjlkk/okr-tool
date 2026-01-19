/**
 * @file Department Goal API
 * @description Get/Set department goal for a period (demo mode returns mock data)
 */

import { NextRequest, NextResponse } from 'next/server'
import { mockDepartmentGoal } from '@/lib/mock-data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { searchParams } = new URL(request.url)
  const period = searchParams.get('period')

  if (!period) {
    return NextResponse.json(
      { success: false, error: 'Period is required' },
      { status: 400 }
    )
  }

  // Demo mode: return mock goal for product department
  if (id === 'product') {
    return NextResponse.json({
      success: true,
      data: {
        id: 'goal-1',
        departmentId: id,
        period,
        objectives: mockDepartmentGoal,
      },
    })
  }

  return NextResponse.json({
    success: true,
    data: null,
  })
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { objectives, period } = await request.json()

  // Demo mode: just return success
  return NextResponse.json({
    success: true,
    data: {
      id: 'goal-new',
      departmentId: id,
      period,
      objectives,
    },
  })
}
