/**
 * @file Team OKR API
 * @description List team members' OKRs by department
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
    const departmentId = searchParams.get('departmentId')
    const period = searchParams.get('period')

    if (!departmentId || !period) {
      return NextResponse.json(
        { success: false, error: 'Department ID and period are required' },
        { status: 400 }
      )
    }

    // Get department goal
    const departmentGoal = await prisma.departmentOKR.findUnique({
      where: {
        departmentId_period: {
          departmentId,
          period,
        },
      },
    })

    // Get team members' OKRs
    const okrs = await prisma.personalOKR.findMany({
      where: {
        user: { departmentId },
        period,
        isArchived: false,
      },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
      orderBy: [{ user: { name: 'asc' } }, { createdAt: 'asc' }],
    })

    return NextResponse.json({
      success: true,
      data: {
        departmentGoal: departmentGoal?.objectives || '',
        okrs: okrs.map((okr) => ({
          id: okr.id,
          userId: okr.user.id,
          userName: okr.user.name,
          userImage: okr.user.image,
          objective: okr.objective,
          keyResults: okr.keyResults as { id: string; content: string }[],
          status: okr.status,
        })),
      },
    })
  } catch (error) {
    console.error('Failed to fetch team OKRs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team OKRs' },
      { status: 500 }
    )
  }
}
