/**
 * @file Optimize Objective API
 * @description AI-optimize an Objective based on user feedback (demo mode returns mock)
 */

import { NextRequest, NextResponse } from 'next/server'
import { mockAIObjective } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  const { currentObjective, feedback } = await request.json()

  if (!currentObjective || !feedback) {
    return NextResponse.json(
      { success: false, error: 'Current objective and feedback are required' },
      { status: 400 }
    )
  }

  // Demo mode: return optimized mock objective
  return NextResponse.json({
    success: true,
    data: `${mockAIObjective} (optimized based on feedback)`,
  })
}
