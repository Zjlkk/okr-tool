/**
 * @file LoadingBar Component
 * @description Global loading bar (Linear style) at top of page
 */

'use client'

interface LoadingBarProps {
  isLoading: boolean
}

export function LoadingBar({ isLoading }: LoadingBarProps) {
  if (!isLoading) return null

  return <div className="loading-bar" />
}
