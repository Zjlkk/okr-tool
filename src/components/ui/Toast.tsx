/**
 * @file Toast Component
 * @description Notification toast for feedback messages
 */

'use client'

import { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  type: ToastType
  message: string
  duration?: number
  onClose: () => void
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
}

const styles: Record<ToastType, string> = {
  success: 'bg-[var(--color-success-light)] text-[var(--color-success)] border-[var(--color-success)]',
  error: 'bg-[var(--color-error-light)] text-[var(--color-error)] border-[var(--color-error)]',
  warning: 'bg-[var(--color-warning-light)] text-[var(--color-warning)] border-[var(--color-warning)]',
  info: 'bg-[var(--color-bg-secondary)] text-[var(--color-primary)] border-[var(--color-primary)]',
}

export function Toast({ type, message, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 200)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  return (
    <div
      className={`
        fixed top-4 right-4 z-[2000]
        flex items-center gap-3
        px-4 py-3
        rounded-[var(--radius-md)]
        shadow-[var(--shadow-lg)]
        border
        text-[var(--text-sm)]
        transition-all duration-[var(--duration-normal)]
        ${styles[type]}
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
      `}
    >
      {icons[type]}
      <span>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 200)
        }}
        className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
