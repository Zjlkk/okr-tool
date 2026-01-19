/**
 * @file Department API
 * @description List all departments (demo mode returns mock data)
 */

import { NextResponse } from 'next/server'
import { mockDepartments } from '@/lib/mock-data'

export async function GET() {
  // Demo mode: return mock departments
  return NextResponse.json({
    success: true,
    data: mockDepartments.map((d) => ({
      id: d.id,
      name: d.name,
      leaderId: d.leaderId,
      leaderName: d.leaderName,
      memberCount: 5,
    })),
  })
}
