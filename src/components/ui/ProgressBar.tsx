/**
 * @file Progress Bar Component
 * @description Animated progress bar for KR progress display
 */

'use client'

interface ProgressBarProps {
  progress: number // 0-100
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function ProgressBar({
  progress,
  size = 'md',
  showLabel = true,
  className = '',
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress))

  const heightMap = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }

  // Color based on progress
  const getProgressColor = () => {
    if (clampedProgress >= 70) return 'bg-[var(--color-success)]'
    if (clampedProgress >= 40) return 'bg-[var(--color-primary)]'
    return 'bg-[var(--color-warning)]'
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`flex-1 ${heightMap[size]} bg-[var(--color-bg-secondary)] rounded-full overflow-hidden`}
      >
        <div
          className={`${heightMap[size]} ${getProgressColor()} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)] min-w-[40px] text-right">
          {clampedProgress}%
        </span>
      )}
    </div>
  )
}
