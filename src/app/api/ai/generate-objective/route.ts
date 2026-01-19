/**
 * @file Generate Objective API
 * @description AI-generate an Objective based on user answers
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateObjective } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { departmentGoal, answers } = await request.json()

    if (!answers?.mostImportantThing || !answers?.whyImportant) {
      return NextResponse.json(
        { success: false, error: 'All questions must be answered' },
        { status: 400 }
      )
    }

    const result = await generateObjective({
      departmentGoal: departmentGoal || '',
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
        { success: false, error: result.error || 'Failed to generate objective' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Failed to generate objective:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate objective' },
      { status: 500 }
    )
  }
}
