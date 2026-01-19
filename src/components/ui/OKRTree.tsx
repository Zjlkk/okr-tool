/**
 * @file OKRTree Component
 * @description Tree visualization for OKRs showing Name → Objectives → Key Results
 */

'use client'

import { Crown } from 'lucide-react'

interface KeyResult {
  id: string
  content: string
}

interface OKR {
  id: string
  objective: string
  keyResults: KeyResult[]
  status: 'DRAFT' | 'SUBMITTED'
}

interface OKRTreeProps {
  name: string
  isLeader?: boolean
  okrs: OKR[]
}

export function OKRTree({ name, isLeader, okrs }: OKRTreeProps) {
  return (
    <div className="flex items-start gap-0">
      {/* Person Name Node */}
      <div className="flex items-center gap-2 flex-shrink-0 min-w-[140px]">
        {isLeader && (
          <Crown className="w-4 h-4 text-[var(--color-primary)]" />
        )}
        <span className={`text-[var(--text-sm)] font-medium ${isLeader ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)]'}`}>
          {name}
        </span>
      </div>

      {/* Connector from Name to Objectives */}
      <div className="flex items-center self-start mt-3">
        <div className="w-6 h-px bg-[var(--color-border)]" />
      </div>

      {/* Objectives Container */}
      <div className="flex-1 relative">
        {/* Vertical line connecting objectives */}
        {okrs.length > 1 && (
          <div
            className="absolute left-0 w-px bg-[var(--color-border)]"
            style={{
              top: '12px',
              height: `calc(100% - 24px)`,
            }}
          />
        )}

        <div className="space-y-4">
          {okrs.map((okr, okrIndex) => (
            <div key={okr.id} className="flex items-start">
              {/* Horizontal connector to objective */}
              <div className="flex items-center self-start mt-3">
                <div className="w-4 h-px bg-[var(--color-border)]" />
              </div>

              {/* Objective Node */}
              <div className="flex items-start gap-0 flex-1">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-8 h-8 rounded-md bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/40 flex items-center justify-center">
                    <span className="text-[var(--color-primary)] font-bold text-xs">O{okrIndex + 1}</span>
                  </div>
                  <span className={`
                    text-[var(--text-xs)] px-2 py-0.5 rounded
                    ${okr.status === 'SUBMITTED'
                      ? 'text-[var(--color-success)] bg-[var(--color-success-light)]'
                      : 'text-[var(--color-warning)] bg-[var(--color-warning-light)]'
                    }
                  `}>
                    {okr.status === 'SUBMITTED' ? 'Submitted' : 'Draft'}
                  </span>
                </div>

                {/* Objective Content and KRs */}
                <div className="flex items-start flex-1">
                  {/* Connector to content */}
                  <div className="flex items-center self-start mt-4">
                    <div className="w-3 h-px bg-[var(--color-border)]" />
                  </div>

                  <div className="flex-1">
                    {/* Objective Text */}
                    <div className="px-3 py-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg mb-3">
                      <p className="text-[var(--text-sm)] text-[var(--color-text-primary)] leading-relaxed">
                        {okr.objective}
                      </p>
                    </div>

                    {/* Key Results */}
                    <div className="relative ml-4">
                      {/* Vertical line for KRs */}
                      {okr.keyResults.length > 1 && (
                        <div
                          className="absolute left-0 w-px bg-[var(--color-border)]"
                          style={{
                            top: '12px',
                            height: `calc(100% - 24px)`,
                          }}
                        />
                      )}

                      <div className="space-y-2">
                        {okr.keyResults.map((kr, krIndex) => (
                          <div key={kr.id} className="flex items-start">
                            {/* Horizontal connector */}
                            <div className="flex items-center self-center">
                              <div className="w-3 h-px bg-[var(--color-border)]" />
                            </div>

                            {/* KR Badge */}
                            <div className="flex items-center gap-2 flex-1">
                              <span className="flex-shrink-0 text-[var(--text-xs)] font-medium text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded">
                                KR{krIndex + 1}
                              </span>
                              <span className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                                {kr.content}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
