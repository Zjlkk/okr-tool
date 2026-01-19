/**
 * @file User Setup API
 * @description Set user role and department (first-time setup)
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

    // Check if user already has a role set
    const existingUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true, departmentId: true },
    })

    if (existingUser?.role && existingUser?.departmentId) {
      return NextResponse.json(
        { success: false, error: 'User setup already complete' },
        { status: 400 }
      )
    }

    // Check if department exists, create if not
    let department = await prisma.department.findUnique({
      where: { id: departmentId },
    })

    if (!department) {
      // Create department with provided ID as name (for demo purposes)
      department = await prisma.department.create({
        data: {
          id: departmentId,
          name: departmentId.charAt(0).toUpperCase() + departmentId.slice(1),
        },
      })
    }

    // Update user
    const updateData: { role: 'LEADER' | 'MEMBER'; departmentId: string } = {
      role,
      departmentId,
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
    })

    // If leader, set as department leader
    if (role === 'LEADER') {
      await prisma.department.update({
        where: { id: departmentId },
        data: { leaderId: session.user.id },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        role: user.role,
        departmentId: user.departmentId,
      },
    })
  } catch (error) {
    console.error('Failed to setup user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to setup user' },
      { status: 500 }
    )
  }
}
