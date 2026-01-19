/**
 * @file Optimize Key Results API
 * @description AI-optimize Key Results based on user feedback (demo mode returns mock)
 */

import { NextRequest, NextResponse } from 'next/server'
import { mockAIKeyResults } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  const { objective, currentKeyResults, feedback } = await request.json()

  if (!objective || !currentKeyResults || !feedback) {
    return NextResponse.json(
      { success: false, error: 'Objective, current key results, and feedback are required' },
      { status: 400 }
    )
  }

  // Demo mode: return optimized mock key results
  return NextResponse.json({
    success: true,
    data: mockAIKeyResults.map((kr, i) =>
      i === 0 ? `${kr} (refined based on feedback)` : kr
    ),
  })
}
