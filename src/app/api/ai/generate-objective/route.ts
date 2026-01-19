/**
 * @file Generate Objective API
 * @description AI-generate an Objective based on user answers (demo mode returns mock)
 */

import { NextRequest, NextResponse } from 'next/server'
import { mockAIObjective } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  const { answers } = await request.json()

  if (!answers?.mostImportantThing || !answers?.whyImportant) {
    return NextResponse.json(
      { success: false, error: 'All questions must be answered' },
      { status: 400 }
    )
  }

  // Demo mode: return mock objective
  return NextResponse.json({
    success: true,
    data: mockAIObjective,
  })
}
