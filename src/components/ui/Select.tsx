/**
 * @file Select Component
 * @description Dropdown select with consistent styling
 */

import { SelectHTMLAttributes, forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: SelectOption[]
  error?: boolean
  label?: string
  helperText?: string
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', options, error, label, helperText, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block mb-1.5 text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full h-10 px-3 pr-10
              text-[var(--text-sm)] text-[var(--color-text-primary)]
              bg-[var(--color-bg-card)]
              border rounded-[var(--radius-md)]
              transition-all duration-[var(--duration-fast)]
              appearance-none cursor-pointer
              focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]
              disabled:bg-[var(--color-bg-secondary)] disabled:cursor-not-allowed
              ${error
                ? 'border-[var(--color-error)] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]'
                : 'border-[var(--color-border)]'
              }
              ${className}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)] pointer-events-none" />
        </div>
        {helperText && (
          <p className={`mt-1.5 text-[var(--text-xs)] ${error ? 'text-[var(--color-error)]' : 'text-[var(--color-text-secondary)]'}`}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
