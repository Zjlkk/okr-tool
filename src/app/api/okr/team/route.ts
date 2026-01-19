/**
 * @file Team OKR API
 * @description List team members' OKRs by department (demo mode returns mock data)
 */

import { NextRequest, NextResponse } from 'next/server'
import { mockTeamOKRs, mockDepartmentGoal } from '@/lib/mock-data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const departmentId = searchParams.get('departmentId')
  const period = searchParams.get('period')

  if (!departmentId || !period) {
    return NextResponse.json(
      { success: false, error: 'Department ID and period are required' },
      { status: 400 }
    )
  }

  // Demo mode: return mock data for product department
  if (departmentId === 'product') {
    return NextResponse.json({
      success: true,
      data: {
        departmentGoal: mockDepartmentGoal,
        okrs: mockTeamOKRs.map((okr) => ({
          id: okr.id,
          userId: okr.userId,
          userName: okr.userName,
          userImage: okr.userImage,
          objective: okr.objective,
          keyResults: okr.keyResults,
          status: okr.status,
        })),
      },
    })
  }

  // Other departments have no data in demo
  return NextResponse.json({
    success: true,
    data: {
      departmentGoal: '',
      okrs: [],
    },
  })
}
