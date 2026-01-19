/**
 * @file Team OKR API
 * @description List team members' OKRs by department (demo mode returns mock data)
 */

import { NextRequest, NextResponse } from 'next/server'
import { mockTeamOKRsByDepartment, mockDepartmentGoal } from '@/lib/mock-data'

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

  // Demo mode: return mock data for the specified department
  const teamMembers = mockTeamOKRsByDepartment[departmentId] || []

  // Flatten the OKRs for backwards compatibility
  const okrs = teamMembers.flatMap((member) =>
    member.okrs.map((okr) => ({
      id: okr.id,
      userId: member.userId,
      userName: member.userName,
      userImage: member.userImage,
      objective: okr.objective,
      keyResults: okr.keyResults.map((kr) => ({
        id: kr.id,
        content: kr.content,
        progress: kr.progress,
      })),
      status: okr.status,
    }))
  )

  return NextResponse.json({
    success: true,
    data: {
      departmentGoal: departmentId === 'product' ? mockDepartmentGoal : '',
      okrs,
    },
  })
}
