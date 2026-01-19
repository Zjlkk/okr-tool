/**
 * @file My OKR Page
 * @description View and manage personal OKRs (demo mode - uses mock data)
 * @see PRD: Function 9 - My OKR
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, Card } from '@/components/ui'
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { formatPeriod, getCurrentPeriod } from '@/lib/utils'
import { mockOKRs } from '@/lib/mock-data'

interface KeyResult {
  id: string
  content: string
  progress?: number
}

interface OKR {
  id: string
  objective: string
  keyResults: KeyResult[]
  status: 'DRAFT' | 'SUBMITTED'
}

export default function MyOKRPage() {
  const [okrs, setOkrs] = useState<OKR[]>([])
  const [expandedOKR, setExpandedOKR] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const currentPeriod = getCurrentPeriod()

  useEffect(() => {
    // Simulate loading with mock data
    const timer = setTimeout(() => {
      setOkrs(mockOKRs)
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const toggleExpand = (id: string) => {
    setExpandedOKR(expandedOKR === id ? null : id)
  }

  const canDelete = okrs.length > 3

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-text-primary)]">
            My OKR
          </h1>
          <p className="mt-1 text-[var(--color-text-secondary)]">
            {formatPeriod(currentPeriod)}
          </p>
        </div>
        <Link href="/create">
          <Button icon={<Plus className="w-4 h-4" />}>
            Add Objective
          </Button>
        </Link>
      </div>

      {/* OKR List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="loading-bar" />
        </div>
      ) : okrs.length === 0 ? (
        <Card className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
            <Plus className="w-8 h-8 text-[var(--color-text-disabled)]" />
          </div>
          <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)] mb-2">
            No OKRs yet
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Start by creating your first Objective for this period.
          </p>
          <Link href="/create">
            <Button>Create Your First OKR</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {okrs.map((okr, index) => (
            <Card key={okr.id} hoverable className="overflow-hidden">
              {/* Objective Header */}
              <div
                className="flex items-start justify-between cursor-pointer"
                onClick={() => toggleExpand(okr.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[var(--text-xs)] font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded">
                      O{index + 1}
                    </span>
                    <span
                      className={`text-[var(--text-xs)] px-2 py-1 rounded ${
                        okr.status === 'SUBMITTED'
                          ? 'text-[var(--color-success)] bg-[var(--color-success-light)]'
                          : 'text-[var(--color-warning)] bg-[var(--color-warning-light)]'
                      }`}
                    >
                      {okr.status === 'SUBMITTED' ? 'Submitted' : 'Draft'}
                    </span>
                  </div>
                  <h3 className="text-[var(--text-base)] font-semibold text-[var(--color-text-primary)]">
                    {okr.objective}
                  </h3>
                  <p className="text-[var(--text-xs)] text-[var(--color-text-secondary)] mt-1">
                    {okr.keyResults.length} Key Results
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // TODO: Edit functionality
                    }}
                    className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)] transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {canDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        // TODO: Delete functionality
                      }}
                      className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error-light)] rounded-[var(--radius-md)] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  {expandedOKR === okr.id ? (
                    <ChevronUp className="w-5 h-5 text-[var(--color-text-secondary)]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--color-text-secondary)]" />
                  )}
                </div>
              </div>

              {/* Key Results (Expanded) */}
              {expandedOKR === okr.id && (
                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <ul className="space-y-3">
                    {okr.keyResults.map((kr, krIndex) => (
                      <li key={kr.id} className="flex items-start gap-3">
                        <span className="text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded mt-0.5">
                          KR{krIndex + 1}
                        </span>
                        <span className="text-[var(--text-sm)] text-[var(--color-text-primary)] flex-1">
                          {kr.content}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}

          {/* Minimum OKRs Warning */}
          {okrs.length < 3 && (
            <div className="p-4 bg-[var(--color-warning-light)] border border-[var(--color-warning)] rounded-[var(--radius-md)]">
              <p className="text-[var(--text-sm)] text-[var(--color-warning)]">
                You need at least 3 Objectives to submit. Currently: {okrs.length}/3
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
