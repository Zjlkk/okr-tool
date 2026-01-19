/**
 * @file Confidence Indicator Component
 * @description Traffic light indicator for OKR confidence level
 */

'use client'

import { useLanguageStore } from '@/stores/useLanguageStore'
import type { Confidence } from '@/lib/mock-data'

interface ConfidenceIndicatorProps {
  confidence: Confidence
  showLabel?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export function ConfidenceIndicator({
  confidence,
  showLabel = true,
  size = 'md',
  className = '',
}: ConfidenceIndicatorProps) {
  const { t } = useLanguageStore()

  const config = {
    on_track: {
      color: 'bg-[var(--color-success)]',
      label: t('progress.onTrack'),
    },
    at_risk: {
      color: 'bg-[var(--color-warning)]',
      label: t('progress.atRisk'),
    },
    off_track: {
      color: 'bg-[var(--color-error)]',
      label: t('progress.offTrack'),
    },
  }

  const sizeMap = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
  }

  const current = config[confidence]

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span
        className={`${sizeMap[size]} ${current.color} rounded-full`}
        style={{ boxShadow: `0 0 4px ${confidence === 'on_track' ? 'var(--color-success)' : confidence === 'at_risk' ? 'var(--color-warning)' : 'var(--color-error)'}` }}
      />
      {showLabel && (
        <span className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
          {current.label}
        </span>
      )}
    </div>
  )
}

interface ConfidenceSelectorProps {
  value: Confidence
  onChange: (confidence: Confidence) => void
  className?: string
}

export function ConfidenceSelector({
  value,
  onChange,
  className = '',
}: ConfidenceSelectorProps) {
  const { t } = useLanguageStore()

  const options: { value: Confidence; label: string; color: string }[] = [
    { value: 'on_track', label: t('progress.onTrack'), color: 'var(--color-success)' },
    { value: 'at_risk', label: t('progress.atRisk'), color: 'var(--color-warning)' },
    { value: 'off_track', label: t('progress.offTrack'), color: 'var(--color-error)' },
  ]

  return (
    <div className={`flex gap-2 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[var(--text-xs)] font-medium
            transition-all duration-200
            ${value === option.value
              ? 'text-white'
              : 'text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)]'
            }
          `}
          style={value === option.value ? { backgroundColor: option.color } : {}}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: value === option.value ? 'white' : option.color }}
          />
          {option.label}
        </button>
      ))}
    </div>
  )
}
