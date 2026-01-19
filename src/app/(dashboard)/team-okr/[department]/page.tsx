/**
 * @file Team OKR Department Page
 * @description View team OKRs for a specific department with tree visualization and progress trends
 */

'use client'

import { use, useState, useEffect } from 'react'
import { OKRTree, Card, TrendChart, ProgressBar, ConfidenceIndicator } from '@/components/ui'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { formatPeriod, getCurrentPeriod } from '@/lib/utils'
import {
  mockDepartments,
  mockLeaderOKRs,
  mockTeamOKRsByDepartment,
  mockCurrentWeek,
  getDepartmentProgressSummary,
  type OKRWithProgress
} from '@/lib/mock-data'
import { Crown, Users, TrendingUp } from 'lucide-react'

interface PageProps {
  params: Promise<{ department: string }>
}

export default function TeamOKRDepartmentPage({ params }: PageProps) {
  const { department } = use(params)
  const { t } = useLanguageStore()
  const [isLoading, setIsLoading] = useState(true)

  const currentPeriod = getCurrentPeriod()
  const currentDept = mockDepartments.find((d) => d.id === department)
  const leaderOKRs = mockLeaderOKRs[department] || []
  const teamMembers = mockTeamOKRsByDepartment[department] || []
  const departmentProgress = getDepartmentProgressSummary()

  useEffect(() => {
    // Reset loading state when department changes
    setIsLoading(true)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [department])

  // Calculate overall department progress
  const getDeptOverallProgress = (): number => {
    if (leaderOKRs.length === 0) return 0
    const totalProgress = leaderOKRs.reduce((sum, okr) => {
      const okrProgress = okr.keyResults.reduce((s, kr) => s + kr.progress, 0) / okr.keyResults.length
      return sum + okrProgress
    }, 0)
    return Math.round(totalProgress / leaderOKRs.length)
  }

  // Get department trend data for chart
  const getTrendLines = () => {
    const deptData = departmentProgress[department] || []
    if (deptData.length === 0) return []

    return [{
      id: department,
      name: currentDept?.name || department,
      data: deptData,
      color: 'var(--color-primary)',
    }]
  }

  if (!currentDept) {
    return (
      <div className="flex items-center justify-center py-20">
        <Card className="text-center py-12 px-8">
          <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)] mb-2">
            Department Not Found
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            Please select a valid department from the sidebar.
          </p>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-8 w-48 bg-[var(--color-bg-secondary)] rounded mb-2" />
          <div className="h-4 w-32 bg-[var(--color-bg-secondary)] rounded" />
        </div>
        {/* Trend chart skeleton */}
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 mb-8">
          <div className="h-5 w-40 bg-[var(--color-bg-secondary)] rounded mb-4" />
          <div className="h-[180px] bg-[var(--color-bg-secondary)] rounded" />
        </div>
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-5 w-32 bg-[var(--color-bg-secondary)] rounded mb-4" />
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6">
            <div className="h-4 w-full bg-[var(--color-bg-secondary)] rounded mb-3" />
            <div className="h-4 w-3/4 bg-[var(--color-bg-secondary)] rounded mb-3" />
            <div className="h-4 w-1/2 bg-[var(--color-bg-secondary)] rounded" />
          </div>
        </div>
      </div>
    )
  }

  const overallProgress = getDeptOverallProgress()
  const trendLines = getTrendLines()

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-text-primary)]">
          {currentDept.name} {t('teamOkr.title')}
        </h1>
        <p className="mt-1 text-[var(--color-text-secondary)]">
          {formatPeriod(currentPeriod)} · {t('progress.currentWeek')}: {mockCurrentWeek}
        </p>
      </div>

      {/* Department Progress Trend */}
      {trendLines.length > 0 && (
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--color-primary)]" />
              <h2 className="text-[var(--text-base)] font-semibold text-[var(--color-text-primary)]">
                {t('progress.departmentTrend')}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                  {t('progress.overallProgress')}:
                </span>
                <span className="text-[var(--text-lg)] font-bold text-[var(--color-primary)]">
                  {overallProgress}%
                </span>
              </div>
            </div>
          </div>
          <TrendChart lines={trendLines} height={180} />
        </Card>
      )}

      {/* Leader's OKR Section */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Crown className="w-5 h-5 text-[var(--color-primary)]" />
          <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)]">
            {t('teamOkr.leaderOkr')}
          </h2>
        </div>

        {leaderOKRs.length > 0 && currentDept.leaderName ? (
          <div className="space-y-4">
            {leaderOKRs.map((okr, index) => (
              <Card key={okr.id}>
                <OKRTreeWithProgress
                  name={index === 0 ? currentDept.leaderName : ''}
                  isLeader={true}
                  okr={okr}
                  okrIndex={index}
                  showName={index === 0}
                />
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-8">
            <p className="text-[var(--color-text-secondary)]">
              No leader OKRs available.
            </p>
          </Card>
        )}
      </div>

      {/* Team Members' OKR Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-[var(--color-text-secondary)]" />
          <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)]">
            {t('teamOkr.teamMembersOkr')}
          </h2>
        </div>

        {teamMembers.length === 0 ? (
          <Card className="text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-disabled)]" />
            <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)] mb-2">
              {t('teamOkr.noOkrs')}
            </h3>
            <p className="text-[var(--color-text-secondary)]">
              {t('teamOkr.noOkrsDesc')}
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {teamMembers.map((member) => (
              <div key={member.userId} className="space-y-4">
                {member.okrs.map((okr, index) => (
                  <Card key={okr.id}>
                    <OKRTreeWithProgress
                      name={index === 0 ? member.userName : ''}
                      isLeader={false}
                      okr={okr}
                      okrIndex={index}
                      showName={index === 0}
                    />
                  </Card>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Enhanced OKR Tree with Progress indicators
interface OKRTreeWithProgressProps {
  name: string
  isLeader: boolean
  okr: OKRWithProgress
  okrIndex: number
  showName?: boolean
}

function OKRTreeWithProgress({ name, isLeader, okr, okrIndex, showName = true }: OKRTreeWithProgressProps) {
  const { t } = useLanguageStore()

  const overallProgress = Math.round(
    okr.keyResults.reduce((sum, kr) => sum + kr.progress, 0) / okr.keyResults.length
  )

  // Get latest confidence
  const latestConfidence = okr.checkIns.length > 0
    ? [...okr.checkIns].sort((a, b) => b.weekNumber - a.weekNumber)[0].confidence
    : 'on_track'

  const formatMetricValue = (value: number, unit?: string, type?: string): string => {
    if (type === 'currency') {
      return `${unit || '$'}${value.toLocaleString()}`
    }
    return `${value}${unit ? ` ${unit}` : ''}`
  }

  return (
    <div>
      {/* Header with Name */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          {showName && (
            <>
              {isLeader && <Crown className="w-4 h-4 text-[var(--color-primary)]" />}
              <span className={`text-[var(--text-sm)] font-medium ${isLeader ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)]'}`}>
                {name}
              </span>
            </>
          )}
          <span className="text-[var(--text-xs)] font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded">
            O{okrIndex + 1}
          </span>
          <span className={`
            text-[var(--text-xs)] px-2 py-0.5 rounded
            ${okr.status === 'SUBMITTED'
              ? 'text-[var(--color-success)] bg-[var(--color-success-light)]'
              : 'text-[var(--color-warning)] bg-[var(--color-warning-light)]'
            }
          `}>
            {okr.status === 'SUBMITTED' ? 'Submitted' : 'Draft'}
          </span>
          <ConfidenceIndicator confidence={latestConfidence} size="sm" />
        </div>
      </div>

      {/* Objective */}
      <div className="mb-3">
        <p className="text-[var(--text-sm)] text-[var(--color-text-primary)] leading-relaxed">
          {okr.objective}
        </p>
      </div>

      {/* Compact Progress Summary */}
      <div className="mb-4 flex items-center gap-2 text-[var(--text-xs)] text-[var(--color-text-disabled)]">
        <span>{t('progress.overallProgress')}</span>
        <span className="font-medium text-[var(--color-text-secondary)]">{overallProgress}%</span>
        <span>({okr.keyResults.length} KRs {t('progress.average')})</span>
      </div>

      {/* Key Results */}
      <div className="space-y-3 pl-4 border-l-2 border-[var(--color-border)]">
        {okr.keyResults.map((kr, krIndex) => (
          <div key={kr.id} className="pl-4">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 text-[var(--text-xs)] font-medium text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-2 py-0.5 rounded">
                  KR{krIndex + 1}
                </span>
                <span className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                  {kr.content}
                </span>
              </div>
              <ConfidenceIndicator confidence={kr.confidence} size="sm" showLabel={false} />
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1">
                <ProgressBar progress={kr.progress} size="sm" />
              </div>
              <div className="text-[var(--text-xs)] text-[var(--color-text-disabled)] whitespace-nowrap">
                {formatMetricValue(kr.metric.current, kr.metric.unit, kr.metric.type)}
                {' / '}
                {formatMetricValue(kr.metric.target, kr.metric.unit, kr.metric.type)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
