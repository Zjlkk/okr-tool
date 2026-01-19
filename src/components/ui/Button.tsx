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
  primary: 'gradient-primary text-white shadow-sm hover:opacity-90 hover:shadow-md active:scale-[0.98]',
  secondary: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-bg-primary)] hover:border-[var(--color-primary)]',
  ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]',
  danger: 'bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90',
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
