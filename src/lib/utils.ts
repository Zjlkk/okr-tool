/**
 * @file Utility Functions
 * @description Common utility functions used across the app
 */

/**
 * Get current OKR period string
 * Format: "YYYY-MM1/MM2" (bi-monthly periods)
 */
export function getCurrentPeriod(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  // Bi-monthly periods: 1-2, 3-4, 5-6, 7-8, 9-10, 11-12
  const periodStart = Math.ceil(month / 2) * 2 - 1
  const periodEnd = periodStart + 1

  const startStr = periodStart.toString().padStart(2, '0')
  const endStr = periodEnd.toString().padStart(2, '0')

  return `${year}-${startStr}/${endStr}`
}

/**
 * Format period string for display
 * "2026-01/02" -> "Jan-Feb 2026"
 */
export function formatPeriod(period: string): string {
  const [yearPart, monthsPart] = period.split('-')
  const [startMonth, endMonth] = monthsPart.split('/')

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  const startName = monthNames[parseInt(startMonth) - 1]
  const endName = monthNames[parseInt(endMonth) - 1]

  return `${startName}-${endName} ${yearPart}`
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Class name helper (like clsx)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
