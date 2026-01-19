/**
 * @file OKRTree Component
 * @description Tree visualization for OKRs showing Name → Objectives → Key Results
 */

'use client'

import { Crown, User } from 'lucide-react'

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
  avatar?: string | null
  isLeader?: boolean
  okrs: OKR[]
}

export function OKRTree({ name, avatar, isLeader, okrs }: OKRTreeProps) {
  return (
    <div className="flex items-start gap-0">
      {/* Person Node */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
          ${isLeader
            ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]'
            : 'bg-[var(--color-bg-elevated)] border border-[var(--color-border)]'
          }
        `}>
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full rounded-full" />
          ) : isLeader ? (
            <Crown className="w-5 h-5 text-white" />
          ) : (
            <span className="text-[var(--color-text-secondary)] font-medium text-lg">
              {name?.[0] || 'U'}
            </span>
          )}
        </div>
        <div className="mt-2 text-center">
          <div className="text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] whitespace-nowrap">
            {name}
          </div>
          {isLeader && (
            <div className="text-[var(--text-xs)] text-[var(--color-primary)]">Leader</div>
          )}
        </div>
      </div>

      {/* Connector from Person to Objectives */}
      <div className="flex items-center self-center mt-[-20px]">
        <div className="w-8 h-px bg-[var(--color-border)]" />
      </div>

      {/* Objectives Container */}
      <div className="flex-1 relative">
        {/* Vertical line connecting objectives */}
        {okrs.length > 1 && (
          <div
            className="absolute left-0 w-px bg-[var(--color-border)]"
            style={{
              top: '24px',
              height: `calc(100% - ${okrs.length > 1 ? '48px' : '0px'})`,
            }}
          />
        )}

        <div className="space-y-4">
          {okrs.map((okr, okrIndex) => (
            <div key={okr.id} className="flex items-start">
              {/* Horizontal connector to objective */}
              <div className="flex items-center self-start mt-6">
                <div className="w-4 h-px bg-[var(--color-border)]" />
              </div>

              {/* Objective Node */}
              <div className="flex items-start gap-0 flex-1">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/40 flex items-center justify-center">
                    <span className="text-[var(--color-primary)] font-bold text-sm">O{okrIndex + 1}</span>
                  </div>
                  <span className={`
                    mt-1 text-[var(--text-xs)] px-2 py-0.5 rounded
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
                  <div className="flex items-center self-start mt-6">
                    <div className="w-3 h-px bg-[var(--color-border)]" />
                  </div>

                  <div className="flex-1">
                    {/* Objective Text */}
                    <div className="px-3 py-2 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg mb-3">
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
