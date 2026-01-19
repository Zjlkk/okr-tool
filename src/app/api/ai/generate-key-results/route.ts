/**
 * @file Generate Key Results API
 * @description AI-generate Key Results based on user answers (demo mode returns mock)
 */

import { NextRequest, NextResponse } from 'next/server'
import { mockAIKeyResults } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  const { objective, answers } = await request.json()

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

  // Demo mode: return mock key results
  return NextResponse.json({
    success: true,
    data: mockAIKeyResults,
  })
}
