/**
 * @file Confidence Indicator Component
 * @description Refined traffic light indicator for OKR confidence level
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

// Soft, muted color palette
const colorPalette = {
  on_track: {
    dot: 'rgba(74, 222, 128, 0.8)',
    glow: 'rgba(74, 222, 128, 0.3)',
    bg: 'rgba(74, 222, 128, 0.15)',
    text: 'rgba(74, 222, 128, 0.9)',
  },
  at_risk: {
    dot: 'rgba(251, 191, 36, 0.8)',
    glow: 'rgba(251, 191, 36, 0.3)',
    bg: 'rgba(251, 191, 36, 0.15)',
    text: 'rgba(251, 191, 36, 0.9)',
  },
  off_track: {
    dot: 'rgba(248, 113, 113, 0.8)',
    glow: 'rgba(248, 113, 113, 0.3)',
    bg: 'rgba(248, 113, 113, 0.15)',
    text: 'rgba(248, 113, 113, 0.9)',
  },
}

export function ConfidenceIndicator({
  confidence,
  showLabel = true,
  size = 'md',
  className = '',
}: ConfidenceIndicatorProps) {
  const { t } = useLanguageStore()

  const labels = {
    on_track: t('progress.onTrack'),
    at_risk: t('progress.atRisk'),
    off_track: t('progress.offTrack'),
  }

  const sizeMap = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
  }

  const colors = colorPalette[confidence]

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span
        className={`${sizeMap[size]} rounded-full`}
        style={{
          backgroundColor: colors.dot,
          boxShadow: `0 0 6px ${colors.glow}`,
        }}
      />
      {showLabel && (
        <span
          className="text-[var(--text-xs)]"
          style={{ color: colors.text }}
        >
          {labels[confidence]}
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

  const options: { value: Confidence; label: string }[] = [
    { value: 'on_track', label: t('progress.onTrack') },
    { value: 'at_risk', label: t('progress.atRisk') },
    { value: 'off_track', label: t('progress.offTrack') },
  ]

  return (
    <div className={`flex gap-2 ${className}`}>
      {options.map((option) => {
        const colors = colorPalette[option.value]
        const isSelected = value === option.value

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[var(--text-xs)] font-medium
              transition-all duration-200 border
            `}
            style={{
              backgroundColor: isSelected ? colors.bg : 'transparent',
              borderColor: isSelected ? colors.dot : 'var(--color-border)',
              color: isSelected ? colors.text : 'var(--color-text-secondary)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: colors.dot }}
            />
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
