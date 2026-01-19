/**
 * @file Textarea Component
 * @description Multi-line text input for longer content
 */

import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  label?: string
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, label, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-1.5 text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)]"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`
            w-full min-h-[120px] px-3 py-2.5
            text-[var(--text-sm)] text-[var(--color-text-primary)]
            bg-[var(--color-bg-card)]
            border rounded-[var(--radius-md)]
            transition-all duration-[var(--duration-fast)]
            placeholder:text-[var(--color-text-disabled)]
            focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]
            disabled:bg-[var(--color-bg-secondary)] disabled:cursor-not-allowed
            resize-y
            ${error
              ? 'border-[var(--color-error)] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]'
              : 'border-[var(--color-border)]'
            }
            ${className}
          `}
          {...props}
        />
        {helperText && (
          <p className={`mt-1.5 text-[var(--text-xs)] ${error ? 'text-[var(--color-error)]' : 'text-[var(--color-text-secondary)]'}`}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
