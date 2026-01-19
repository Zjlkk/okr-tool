/**
 * @file Generate Key Results API
 * @description AI-generate Key Results based on user answers
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateKeyResults } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { departmentGoal, objective, answers } = await request.json()

    if (!objective) {
      return NextResponse.json(
        { success: false, error: 'Objective is required' },
        { status: 400 }
      )
    }

    if (!answers?.keyActions || !answers?.successCriteria) {
      return NextResponse.json(
        { success: false, error: 'All questions must be answered' },
        { status: 400 }
      )
    }

    const result = await generateKeyResults({
      departmentGoal: departmentGoal || '',
      objective,
      answers,
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
      })
    } else if (result.feedback) {
      return NextResponse.json({
        success: false,
        feedback: result.feedback,
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to generate key results' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Failed to generate key results:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate key results' },
      { status: 500 }
    )
  }
}
