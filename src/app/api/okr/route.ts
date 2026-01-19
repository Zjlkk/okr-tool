/**
 * @file OKR API
 * @description Create and list personal OKRs (demo mode returns mock data)
 */

import { NextRequest, NextResponse } from 'next/server'
import { mockOKRs } from '@/lib/mock-data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const period = searchParams.get('period')

  // Demo mode: return mock OKRs
  return NextResponse.json({
    success: true,
    data: mockOKRs.map((okr) => ({
      id: okr.id,
      objective: okr.objective,
      keyResults: okr.keyResults,
      status: okr.status,
      period: period || '2026-01',
    })),
  })
}

export async function POST(request: NextRequest) {
  const { okrs, period } = await request.json()

  if (!okrs || !Array.isArray(okrs) || okrs.length < 3) {
    return NextResponse.json(
      { success: false, error: 'At least 3 objectives are required' },
      { status: 400 }
    )
  }

  // Demo mode: just return success with the submitted OKRs
  return NextResponse.json({
    success: true,
    data: okrs.map((okr: { objective: string; keyResults: { id: string; content: string }[] }, index: number) => ({
      id: `okr-new-${index + 1}`,
      userId: 'demo-user-1',
      period,
      objective: okr.objective,
      keyResults: okr.keyResults,
      status: 'SUBMITTED',
    })),
  })
}
