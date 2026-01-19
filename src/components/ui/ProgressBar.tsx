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

  // Bright colors with high transparency for refined look
  const getProgressStyle = (): { background: string } => {
    if (clampedProgress >= 70) {
      // Bright green - success
      return { background: 'rgba(34, 197, 94, 0.35)' }
    }
    if (clampedProgress >= 40) {
      // Bright blue/primary
      return { background: 'rgba(59, 130, 246, 0.35)' }
    }
    // Bright amber - warning
    return { background: 'rgba(245, 158, 11, 0.35)' }
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
