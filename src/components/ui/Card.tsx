/**
 * @file Card Component
 * @description Container component with consistent styling
 */

import { HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hoverable, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-[var(--color-bg-card)]
          rounded-[var(--radius-lg)]
          p-6
          shadow-[var(--shadow-sm)]
          border border-[var(--color-border-light)]
          ${hoverable ? 'transition-all duration-[var(--duration-fast)] hover:shadow-[var(--shadow-md)] hover:border-[var(--color-border)]' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
