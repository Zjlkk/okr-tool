/**
 * @file Button Component
 * @description Primary button component with multiple variants and sizes
 */

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-transparent text-white border border-white/30 hover:border-white/60 hover:bg-white/5 active:scale-[0.98]',
  secondary: 'bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-text-secondary)] hover:text-white',
  ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white',
  danger: 'bg-transparent text-[var(--color-error)] border border-[var(--color-error)]/30 hover:border-[var(--color-error)] hover:bg-[var(--color-error)]/10',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[var(--text-xs)]',
  md: 'h-10 px-4 text-[var(--text-sm)]',
  lg: 'h-12 px-6 text-[var(--text-base)]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', loading, icon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center gap-2
          font-medium rounded-[var(--radius-md)]
          transition-all duration-[var(--duration-fast)]
          cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : icon ? (
          icon
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
