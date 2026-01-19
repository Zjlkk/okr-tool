/**
 * @file Department API
 * @description List all departments
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      include: {
        leader: {
          select: { id: true, name: true },
        },
        _count: {
          select: { members: true },
        },
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: departments.map((d) => ({
        id: d.id,
        name: d.name,
        leaderId: d.leaderId,
        leaderName: d.leader?.name,
        memberCount: d._count.members,
      })),
    })
  } catch (error) {
    console.error('Failed to fetch departments:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch departments' },
      { status: 500 }
    )
  }
}
