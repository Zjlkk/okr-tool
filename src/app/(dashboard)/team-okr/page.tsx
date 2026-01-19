/**
 * @file Team OKR Page
 * @description View team members' OKRs by department (demo mode - uses mock data)
 * @see PRD: Function 10 - Team OKR
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, Tabs } from '@/components/ui'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { formatPeriod, getCurrentPeriod } from '@/lib/utils'
import { ChevronDown, ChevronUp, User, Crown } from 'lucide-react'
import { mockDepartments, mockLeaderOKRs, mockTeamOKRsByDepartment } from '@/lib/mock-data'

interface KeyResult {
  id: string
  content: string
}

interface LeaderOKR {
  id: string
  objective: string
  keyResults: KeyResult[]
  status: 'DRAFT' | 'SUBMITTED'
}

interface UserOKR {
  id: string
  userId: string
  userName: string
  userImage?: string | null
  objective: string
  keyResults: KeyResult[]
  status: 'DRAFT' | 'SUBMITTED'
}

interface Department {
  id: string
  name: string
  leaderId?: string
  leaderName?: string
}

export default function TeamOKRPage() {
  const { t } = useLanguageStore()

  const [departments, setDepartments] = useState<Department[]>([])
  const [activeDepartment, setActiveDepartment] = useState<string>('')
  const [leaderOKRs, setLeaderOKRs] = useState<LeaderOKR[]>([])
  const [teamOKRs, setTeamOKRs] = useState<UserOKR[]>([])
  const [expandedOKR, setExpandedOKR] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const currentPeriod = getCurrentPeriod()

  // Load mock departments
  useEffect(() => {
    setDepartments(mockDepartments)
    setActiveDepartment(mockDepartments[0]?.id || 'product')
  }, [])

  // Load mock OKRs when department changes
  useEffect(() => {
    if (!activeDepartment) return

    setIsLoading(true)
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Get leader OKRs for this department
      const deptLeaderOKRs = mockLeaderOKRs[activeDepartment] || []
      setLeaderOKRs(deptLeaderOKRs)

      // Get team OKRs for this department
      const deptTeamOKRs = mockTeamOKRsByDepartment[activeDepartment] || []
      setTeamOKRs(deptTeamOKRs)

      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [activeDepartment])

  const toggleExpand = (id: string) => {
    setExpandedOKR(expandedOKR === id ? null : id)
  }

  const currentDept = departments.find((d) => d.id === activeDepartment)

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-text-primary)]">
          {t('teamOkr.title')}
        </h1>
        <p className="mt-1 text-[var(--color-text-secondary)]">
          {formatPeriod(currentPeriod)}
        </p>
      </div>

      {/* Department Tabs */}
      <Tabs
        tabs={departments.map((d) => ({ id: d.id, label: d.name }))}
        defaultTab={activeDepartment}
        onChange={setActiveDepartment}
        className="mb-6"
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="loading-bar" />
        </div>
      ) : (
        <>
          {/* Leader's OKR Section */}
          {leaderOKRs.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-5 h-5 text-[var(--color-primary)]" />
                <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)]">
                  {t('teamOkr.leaderOkr')}
                </h2>
                {currentDept?.leaderName && (
                  <span className="text-[var(--color-text-secondary)]">
                    - {currentDept.leaderName}
                  </span>
                )}
              </div>
              <div className="space-y-4">
                {leaderOKRs.map((okr) => (
                  <Card key={okr.id} className="border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5">
                    {/* Objective */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0" style={{ boxShadow: 'var(--glow-primary-sm)' }}>
                        <span className="text-white text-[var(--text-xs)] font-bold">O</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[var(--text-xs)] px-2 py-0.5 rounded ${
                              okr.status === 'SUBMITTED'
                                ? 'text-[var(--color-success)] bg-[var(--color-success-light)]'
                                : 'text-[var(--color-warning)] bg-[var(--color-warning-light)]'
                            }`}
                          >
                            {okr.status === 'SUBMITTED' ? t('status.submitted') : t('status.draft')}
                          </span>
                        </div>
                        <h3 className="text-[var(--color-text-primary)] font-medium">{okr.objective}</h3>
                      </div>
                    </div>

                    {/* Key Results - Always Expanded */}
                    <div className="ml-11 space-y-3">
                      {okr.keyResults.map((kr, index) => (
                        <div key={kr.id} className="flex items-start gap-3">
                          <span className="text-[var(--text-xs)] font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded">
                            KR{index + 1}
                          </span>
                          <span className="text-[var(--text-sm)] text-[var(--color-text-primary)] flex-1">
                            {kr.content}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Team Members' OKR Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-[var(--color-text-secondary)]" />
              <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)]">
                {t('teamOkr.teamMembersOkr')}
              </h2>
            </div>

            {teamOKRs.length === 0 ? (
              <Card className="text-center py-12">
                <User className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-disabled)]" />
                <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)] mb-2">
                  {t('teamOkr.noOkrs')}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {t('teamOkr.noOkrsDesc')}
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {teamOKRs.map((okr) => (
                  <Card key={okr.id} hoverable className="overflow-hidden">
                    {/* Header */}
                    <div
                      className="flex items-start justify-between cursor-pointer"
                      onClick={() => toggleExpand(okr.id)}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        {okr.userImage ? (
                          <img
                            src={okr.userImage}
                            alt={okr.userName}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
                            <span className="text-[var(--color-text-secondary)] font-medium">
                              {okr.userName?.[0] || 'U'}
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[var(--text-sm)] font-medium text-[var(--color-text-primary)]">
                              {okr.userName}
                            </span>
                            <span
                              className={`text-[var(--text-xs)] px-2 py-0.5 rounded ${
                                okr.status === 'SUBMITTED'
                                  ? 'text-[var(--color-success)] bg-[var(--color-success-light)]'
                                  : 'text-[var(--color-warning)] bg-[var(--color-warning-light)]'
                              }`}
                            >
                              {okr.status === 'SUBMITTED' ? t('status.submitted') : t('status.draft')}
                            </span>
                          </div>
                          <h3 className="text-[var(--color-text-primary)]">{okr.objective}</h3>
                          <p className="text-[var(--text-xs)] text-[var(--color-text-secondary)] mt-1">
                            {okr.keyResults.length} Key Results
                          </p>
                        </div>
                      </div>
                      <div className="ml-4">
                        {expandedOKR === okr.id ? (
                          <ChevronUp className="w-5 h-5 text-[var(--color-text-secondary)]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[var(--color-text-secondary)]" />
                        )}
                      </div>
                    </div>

                    {/* Key Results */}
                    {expandedOKR === okr.id && (
                      <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                        <ul className="space-y-3">
                          {okr.keyResults.map((kr, index) => (
                            <li key={kr.id} className="flex items-start gap-3">
                              <span className="text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded">
                                KR{index + 1}
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
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
