/**
 * @file Weekly Check-In Modal Component
 * @description Modal for updating KR progress with actual metric values
 */

'use client'

import { useState } from 'react'
import { X, Save, TrendingUp } from 'lucide-react'
import { Button } from './Button'
import { Textarea } from './Textarea'
import { ConfidenceSelector } from './ConfidenceIndicator'
import { ProgressBar } from './ProgressBar'
import { useLanguageStore } from '@/stores/useLanguageStore'
import type { OKRWithProgress, Confidence, calculateProgress } from '@/lib/mock-data'

interface CheckInValue {
  krId: string
  value: number
  progress: number
}

interface WeeklyCheckInModalProps {
  isOpen: boolean
  onClose: () => void
  okr: OKRWithProgress
  weekNumber: number
  onSave: (data: {
    krValues: CheckInValue[]
    confidence: Confidence
    notes: string
  }) => void
}

export function WeeklyCheckInModal({
  isOpen,
  onClose,
  okr,
  weekNumber,
  onSave,
}: WeeklyCheckInModalProps) {
  const { t } = useLanguageStore()

  // Initialize with current values
  const [krValues, setKrValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {}
    okr.keyResults.forEach((kr) => {
      initial[kr.id] = kr.metric.current
    })
    return initial
  })

  const [confidence, setConfidence] = useState<Confidence>('on_track')
  const [notes, setNotes] = useState('')

  if (!isOpen) return null

  // Calculate progress for a value
  const calcProgress = (kr: OKRWithProgress['keyResults'][0], value: number): number => {
    const { baseline, target } = kr.metric
    if (target === baseline) return value >= target ? 100 : 0
    const progress = ((value - baseline) / (target - baseline)) * 100
    return Math.max(0, Math.min(100, Math.round(progress)))
  }

  // Calculate overall progress
  const overallProgress = Math.round(
    okr.keyResults.reduce((sum, kr) => {
      return sum + calcProgress(kr, krValues[kr.id] || kr.metric.current)
    }, 0) / okr.keyResults.length
  )

  const handleSave = () => {
    const checkInValues: CheckInValue[] = okr.keyResults.map((kr) => ({
      krId: kr.id,
      value: krValues[kr.id] || kr.metric.current,
      progress: calcProgress(kr, krValues[kr.id] || kr.metric.current),
    }))

    onSave({
      krValues: checkInValues,
      confidence,
      notes,
    })
    onClose()
  }

  const formatMetricValue = (value: number, unit?: string, type?: string): string => {
    if (type === 'currency') {
      return `${unit || '$'}${value.toLocaleString()}`
    }
    return `${value}${unit ? ` ${unit}` : ''}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] shadow-xl m-4">
        {/* Header */}
        <div className="sticky top-0 bg-[var(--color-bg-card)] border-b border-[var(--color-border)] p-6 flex items-center justify-between">
          <div>
            <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)]">
              {t('progress.weeklyCheckIn')} - {t('progress.week')} {weekNumber}
            </h2>
            <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-1">
              {okr.objective}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* KR Inputs */}
          <div className="space-y-4">
            <h3 className="text-[var(--text-sm)] font-medium text-[var(--color-text-primary)]">
              {t('progress.updateMetrics')}
            </h3>

            {okr.keyResults.map((kr, index) => {
              const currentValue = krValues[kr.id] || kr.metric.current
              const progress = calcProgress(kr, currentValue)

              return (
                <div
                  key={kr.id}
                  className="p-4 bg-[var(--color-bg-secondary)] rounded-lg"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-[var(--text-xs)] font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded">
                      KR{index + 1}
                    </span>
                    <span className="text-[var(--text-sm)] text-[var(--color-text-primary)] flex-1">
                      {kr.content}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[var(--text-xs)] text-[var(--color-text-disabled)]">
                          {t('progress.baseline')}: {formatMetricValue(kr.metric.baseline, kr.metric.unit, kr.metric.type)}
                        </span>
                        <span className="text-[var(--color-text-disabled)]">→</span>
                        <span className="text-[var(--text-xs)] text-[var(--color-text-disabled)]">
                          {t('progress.target')}: {formatMetricValue(kr.metric.target, kr.metric.unit, kr.metric.type)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
                          {t('progress.current')}:
                        </span>
                        <input
                          type="number"
                          value={currentValue}
                          onChange={(e) => setKrValues({
                            ...krValues,
                            [kr.id]: parseFloat(e.target.value) || 0,
                          })}
                          className="w-24 px-3 py-1.5 text-[var(--text-sm)] bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
                          step={kr.metric.type === 'percentage' ? 1 : 0.1}
                        />
                        {kr.metric.unit && (
                          <span className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
                            {kr.metric.unit}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-32">
                      <ProgressBar progress={progress} size="sm" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Overall Progress */}
          <div className="p-4 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[var(--text-sm)] font-medium text-[var(--color-text-primary)]">
                {t('progress.overallProgress')}
              </span>
              <span className="text-[var(--text-lg)] font-bold text-[var(--color-primary)]">
                {overallProgress}%
              </span>
            </div>
            <ProgressBar progress={overallProgress} size="lg" showLabel={false} />
          </div>

          {/* Confidence */}
          <div>
            <h3 className="text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] mb-3">
              {t('progress.confidenceLevel')}
            </h3>
            <ConfidenceSelector value={confidence} onChange={setConfidence} />
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] mb-3">
              {t('progress.notes')} ({t('progress.optional')})
            </h3>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('progress.notesPlaceholder')}
              className="min-h-[80px]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[var(--color-bg-card)] border-t border-[var(--color-border)] p-6 flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            {t('create.cancel')}
          </Button>
          <Button onClick={handleSave} icon={<Save className="w-4 h-4" />}>
            {t('progress.saveCheckIn')}
          </Button>
        </div>
      </div>
    </div>
  )
}
