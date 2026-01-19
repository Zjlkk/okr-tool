/**
 * @file My OKR Page
 * @description View and manage personal OKRs with progress tracking (demo mode - uses mock data)
 * @see PRD: Function 9 - My OKR
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, Card, Textarea, ProgressBar, ConfidenceIndicator, MiniTrendChart, WeeklyCheckInModal } from '@/components/ui'
import { Plus, Edit2, Trash2, X, Check, Calendar, TrendingUp } from 'lucide-react'
import { formatPeriod, getCurrentPeriod } from '@/lib/utils'
import { mockOKRs, mockCurrentWeek, type OKRWithProgress, type Confidence } from '@/lib/mock-data'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useToastStore } from '@/stores/useToastStore'

interface EditFormData {
  objective: string
  keyResults: string[]
}

export default function MyOKRPage() {
  const [okrs, setOkrs] = useState<OKRWithProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<EditFormData>({ objective: '', keyResults: [] })
  const [checkInOkr, setCheckInOkr] = useState<OKRWithProgress | null>(null)
  const { t } = useLanguageStore()
  const { success: showSuccess } = useToastStore()

  const currentPeriod = getCurrentPeriod()

  useEffect(() => {
    // Simulate loading with mock data
    const timer = setTimeout(() => {
      setOkrs(mockOKRs)
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const canDelete = okrs.length > 3

  const handleStartEdit = (index: number) => {
    const okr = okrs[index]
    setEditForm({
      objective: okr.objective,
      keyResults: okr.keyResults.map(kr => kr.content),
    })
    setEditingIndex(index)
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditForm({ objective: '', keyResults: [] })
  }

  const handleSaveEdit = () => {
    if (editingIndex === null) return

    const updatedOkrs = [...okrs]
    updatedOkrs[editingIndex] = {
      ...updatedOkrs[editingIndex],
      objective: editForm.objective,
      keyResults: editForm.keyResults.map((content, i) => ({
        ...updatedOkrs[editingIndex].keyResults[i],
        id: updatedOkrs[editingIndex].keyResults[i]?.id || `kr-${Date.now()}-${i}`,
        content,
      })),
    }
    setOkrs(updatedOkrs)
    setEditingIndex(null)
    setEditForm({ objective: '', keyResults: [] })
    showSuccess(t('myOkr.editSuccess'))
  }

  const handleEditKeyResult = (krIndex: number, value: string) => {
    const newKeyResults = [...editForm.keyResults]
    newKeyResults[krIndex] = value
    setEditForm({ ...editForm, keyResults: newKeyResults })
  }

  const handleDeleteOKR = (index: number) => {
    const updatedOkrs = okrs.filter((_, i) => i !== index)
    setOkrs(updatedOkrs)
    showSuccess(t('myOkr.deleteSuccess'))
  }

  // Calculate overall progress for an OKR
  const getOverallProgress = (okr: OKRWithProgress): number => {
    if (okr.keyResults.length === 0) return 0
    return Math.round(
      okr.keyResults.reduce((sum, kr) => sum + kr.progress, 0) / okr.keyResults.length
    )
  }

  // Get the latest confidence from check-ins
  const getLatestConfidence = (okr: OKRWithProgress): Confidence => {
    if (okr.checkIns.length === 0) return 'on_track'
    const sortedCheckIns = [...okr.checkIns].sort((a, b) => b.weekNumber - a.weekNumber)
    return sortedCheckIns[0].confidence
  }

  // Get trend data for mini chart
  const getTrendData = (okr: OKRWithProgress): { weekNumber: number; progress: number }[] => {
    return okr.checkIns.map(ci => ({
      weekNumber: ci.weekNumber,
      progress: ci.overallProgress,
    }))
  }

  // Handle check-in save
  const handleCheckInSave = (data: {
    krValues: { krId: string; value: number; progress: number }[]
    confidence: Confidence
    notes: string
  }) => {
    if (!checkInOkr) return

    const okrIndex = okrs.findIndex(o => o.id === checkInOkr.id)
    if (okrIndex === -1) return

    const updatedOkrs = [...okrs]
    const updatedOkr = { ...updatedOkrs[okrIndex] }

    // Update KR metrics
    updatedOkr.keyResults = updatedOkr.keyResults.map(kr => {
      const update = data.krValues.find(v => v.krId === kr.id)
      if (update) {
        return {
          ...kr,
          metric: { ...kr.metric, current: update.value },
          progress: update.progress,
          confidence: data.confidence,
        }
      }
      return kr
    })

    // Add new check-in
    const overallProgress = Math.round(
      data.krValues.reduce((sum, v) => sum + v.progress, 0) / data.krValues.length
    )
    const newCheckIn = {
      id: `ci-${Date.now()}`,
      weekNumber: mockCurrentWeek,
      date: new Date().toISOString().split('T')[0],
      krProgress: data.krValues,
      overallProgress,
      confidence: data.confidence,
      notes: data.notes || undefined,
    }

    // Replace or add check-in for current week
    const existingCheckInIndex = updatedOkr.checkIns.findIndex(
      ci => ci.weekNumber === mockCurrentWeek
    )
    if (existingCheckInIndex !== -1) {
      updatedOkr.checkIns[existingCheckInIndex] = newCheckIn
    } else {
      updatedOkr.checkIns.push(newCheckIn)
    }

    updatedOkrs[okrIndex] = updatedOkr
    setOkrs(updatedOkrs)
    showSuccess(t('progress.checkInSuccess'))
  }

  const formatMetricValue = (value: number, unit?: string, type?: string): string => {
    if (type === 'currency') {
      return `${unit || '$'}${value.toLocaleString()}`
    }
    return `${value}${unit ? ` ${unit}` : ''}`
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-text-primary)]">
            {t('myOkr.title')}
          </h1>
          <p className="mt-1 text-[var(--color-text-secondary)]">
            {formatPeriod(currentPeriod)} · {t('progress.currentWeek')}: {mockCurrentWeek}
          </p>
        </div>
        <Link href="/create">
          <Button icon={<Plus className="w-4 h-4" />}>
            {t('myOkr.addObjective')}
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
            {t('myOkr.noOkrs')}
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-6">
            {t('myOkr.startCreating')}
          </p>
          <Link href="/create">
            <Button>{t('myOkr.createFirst')}</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {okrs.map((okr, index) => {
            const overallProgress = getOverallProgress(okr)
            const confidence = getLatestConfidence(okr)
            const trendData = getTrendData(okr)

            return (
              <Card key={okr.id} className="overflow-hidden">
                {editingIndex === index ? (
                  /* Edit Mode */
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[var(--text-xs)] font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded">
                          O{index + 1}
                        </span>
                        <span className="text-[var(--text-sm)] font-medium text-[var(--color-text-primary)]">
                          {t('myOkr.editing')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-error)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)] transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-success)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)] transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2 text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)]">
                        {t('create.objective')}
                      </label>
                      <Textarea
                        value={editForm.objective}
                        onChange={(e) => setEditForm({ ...editForm, objective: e.target.value })}
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="pt-4 border-t border-[var(--color-border)]">
                      <label className="block mb-2 text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)]">
                        {t('create.keyResults')}
                      </label>
                      <ul className="space-y-3">
                        {editForm.keyResults.map((kr, krIndex) => (
                          <li key={krIndex} className="flex items-start gap-3">
                            <span className="text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded mt-2">
                              KR{krIndex + 1}
                            </span>
                            <Textarea
                              value={kr}
                              onChange={(e) => handleEditKeyResult(krIndex, e.target.value)}
                              className="flex-1 min-h-[60px]"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  /* View Mode */
                  <>
                    <div className="flex items-start justify-between">
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
                            {okr.status === 'SUBMITTED' ? t('status.submitted') : t('status.draft')}
                          </span>
                          <ConfidenceIndicator confidence={confidence} size="sm" />
                        </div>
                        <h3 className="text-[var(--text-base)] font-semibold text-[var(--color-text-primary)]">
                          {okr.objective}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => setCheckInOkr(okr)}
                          className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)] transition-colors"
                          title={t('progress.weeklyCheckIn')}
                        >
                          <Calendar className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStartEdit(index)}
                          className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)] transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {canDelete && (
                          <button
                            onClick={() => handleDeleteOKR(index)}
                            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error-light)] rounded-[var(--radius-md)] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress Overview */}
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
                            {t('progress.overallProgress')}
                          </span>
                          <span className="text-[var(--text-sm)] font-semibold text-[var(--color-primary)]">
                            {overallProgress}%
                          </span>
                        </div>
                        <ProgressBar progress={overallProgress} size="md" showLabel={false} />
                      </div>
                      {trendData.length > 0 && (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-[var(--color-text-disabled)]" />
                          <MiniTrendChart data={trendData} />
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                      <ul className="space-y-4">
                        {okr.keyResults.map((kr, krIndex) => (
                          <li key={kr.id} className="flex items-start gap-3">
                            <span className="text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded mt-0.5">
                              KR{krIndex + 1}
                            </span>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <span className="text-[var(--text-sm)] text-[var(--color-text-primary)]">
                                  {kr.content}
                                </span>
                                <ConfidenceIndicator confidence={kr.confidence} size="sm" showLabel={false} />
                              </div>
                              <div className="flex items-center gap-3">
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
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </Card>
            )
          })}

          {/* Minimum OKRs Warning */}
          {okrs.length < 3 && (
            <div className="p-4 bg-[var(--color-warning-light)] border border-[var(--color-warning)] rounded-[var(--radius-md)]">
              <p className="text-[var(--text-sm)] text-[var(--color-warning)]">
                {t('myOkr.minimumWarning').replace('{current}', String(okrs.length))}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Weekly Check-In Modal */}
      {checkInOkr && (
        <WeeklyCheckInModal
          isOpen={true}
          onClose={() => setCheckInOkr(null)}
          okr={checkInOkr}
          weekNumber={mockCurrentWeek}
          onSave={handleCheckInSave}
        />
      )}
    </div>
  )
}
