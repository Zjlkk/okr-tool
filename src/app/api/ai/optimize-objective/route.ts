/**
 * @file Optimize Objective API
 * @description AI-optimize an Objective based on user feedback
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { optimizeObjective } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { currentObjective, feedback, departmentGoal } = await request.json()

    if (!currentObjective || !feedback) {
      return NextResponse.json(
        { success: false, error: 'Current objective and feedback are required' },
        { status: 400 }
      )
    }

    const result = await optimizeObjective(currentObjective, feedback, departmentGoal || '')

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to optimize objective' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Failed to optimize objective:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to optimize objective' },
      { status: 500 }
    )
  }
}
