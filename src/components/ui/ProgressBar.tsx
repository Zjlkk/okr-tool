/**
 * @file Progress Bar Component
 * @description Animated progress bar for KR progress display with refined aesthetics
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
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2',
  }

  // Bright neon colors for dark background
  const getProgressStyle = (): { background: string } => {
    if (clampedProgress >= 70) {
      // Neon green
      return { background: '#4ade80' }
    }
    if (clampedProgress >= 40) {
      // Neon cyan
      return { background: '#22d3ee' }
    }
    // Neon orange
    return { background: '#fb923c' }
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`flex-1 ${heightMap[size]} bg-white/[0.06] rounded-full overflow-hidden`}
      >
        <div
          className={`${heightMap[size]} rounded-full transition-all duration-500 ease-out`}
          style={{
            width: `${clampedProgress}%`,
            ...getProgressStyle(),
          }}
        />
      </div>
      {showLabel && (
        <span className="text-[var(--text-xs)] font-medium text-[var(--color-text-disabled)] min-w-[36px] text-right">
          {clampedProgress}%
        </span>
      )}
    </div>
  )
}
