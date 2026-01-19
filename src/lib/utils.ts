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
 * Get all available periods (past 6 periods + current + next)
 */
export function getAvailablePeriods(): { period: string; label: string; type: 'past' | 'current' | 'next' }[] {
  const currentPeriod = getCurrentPeriod()
  const [currentYear, currentMonths] = currentPeriod.split('-')
  const currentStartMonth = parseInt(currentMonths.split('/')[0])

  const periods: { period: string; label: string; type: 'past' | 'current' | 'next' }[] = []

  // Generate past 6 periods
  let year = parseInt(currentYear)
  let startMonth = currentStartMonth

  for (let i = 0; i < 6; i++) {
    startMonth -= 2
    if (startMonth <= 0) {
      startMonth += 12
      year -= 1
    }
    const endMonth = startMonth + 1
    const period = `${year}-${startMonth.toString().padStart(2, '0')}/${endMonth.toString().padStart(2, '0')}`
    periods.unshift({ period, label: formatPeriod(period), type: 'past' })
  }

  // Add current period
  periods.push({ period: currentPeriod, label: formatPeriod(currentPeriod), type: 'current' })

  // Add next period
  let nextYear = parseInt(currentYear)
  let nextStartMonth = currentStartMonth + 2
  if (nextStartMonth > 12) {
    nextStartMonth -= 12
    nextYear += 1
  }
  const nextEndMonth = nextStartMonth + 1
  const nextPeriod = `${nextYear}-${nextStartMonth.toString().padStart(2, '0')}/${nextEndMonth.toString().padStart(2, '0')}`
  periods.push({ period: nextPeriod, label: formatPeriod(nextPeriod), type: 'next' })

  return periods
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
