/**
 * @file Optimize Key Results API
 * @description AI-optimize Key Results based on user feedback
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { optimizeKeyResults } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { objective, currentKeyResults, feedback } = await request.json()

    if (!objective || !currentKeyResults || !feedback) {
      return NextResponse.json(
        { success: false, error: 'Objective, current key results, and feedback are required' },
        { status: 400 }
      )
    }

    const result = await optimizeKeyResults(objective, currentKeyResults, feedback)

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to optimize key results' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Failed to optimize key results:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to optimize key results' },
      { status: 500 }
    )
  }
}
