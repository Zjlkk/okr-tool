/**
 * @file PeriodSelector Component
 * @description Dropdown selector for OKR periods (past, current, next)
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Calendar, History, Clock } from 'lucide-react'
import { usePeriodStore } from '@/stores/usePeriodStore'
import { getAvailablePeriods, getCurrentPeriod } from '@/lib/utils'

export function PeriodSelector() {
  const { selectedPeriod, setSelectedPeriod } = usePeriodStore()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const periods = getAvailablePeriods()
  const currentPeriod = getCurrentPeriod()
  const selected = periods.find(p => p.period === selectedPeriod) || periods.find(p => p.type === 'current')

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getTypeIcon = (type: 'past' | 'current' | 'next') => {
    switch (type) {
      case 'past':
        return <History className="w-3.5 h-3.5" />
      case 'current':
        return <Calendar className="w-3.5 h-3.5" />
      case 'next':
        return <Clock className="w-3.5 h-3.5" />
    }
  }

  const getTypeLabel = (type: 'past' | 'current' | 'next') => {
    switch (type) {
      case 'past':
        return 'View'
      case 'current':
        return 'Current'
      case 'next':
        return 'Create'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] text-[var(--text-sm)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-text-secondary)] transition-colors"
      >
        {selected && getTypeIcon(selected.type)}
        <span className="text-[var(--color-text-primary)] font-medium">{selected?.label}</span>
        {selected?.type === 'current' && (
          <span className="text-[var(--text-xs)] text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-1.5 py-0.5 rounded">
            Current
          </span>
        )}
        <ChevronDown className={`w-4 h-4 text-[var(--color-text-secondary)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-lg overflow-hidden z-50">
          {/* Next Period - Create */}
          <div className="p-2 border-b border-[var(--color-border)]">
            <div className="text-[var(--text-xs)] text-[var(--color-text-secondary)] px-2 py-1 mb-1">
              Upcoming
            </div>
            {periods.filter(p => p.type === 'next').map((p) => (
              <button
                key={p.period}
                onClick={() => {
                  setSelectedPeriod(p.period)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-left transition-colors ${
                  selectedPeriod === p.period
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="flex-1">{p.label}</span>
                <span className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">Create OKR</span>
              </button>
            ))}
          </div>

          {/* Current Period */}
          <div className="p-2 border-b border-[var(--color-border)]">
            <div className="text-[var(--text-xs)] text-[var(--color-text-secondary)] px-2 py-1 mb-1">
              Current Period
            </div>
            {periods.filter(p => p.type === 'current').map((p) => (
              <button
                key={p.period}
                onClick={() => {
                  setSelectedPeriod(p.period)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-left transition-colors ${
                  selectedPeriod === p.period
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span className="flex-1">{p.label}</span>
                <span className="text-[var(--text-xs)] px-1.5 py-0.5 rounded bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  Now
                </span>
              </button>
            ))}
          </div>

          {/* Past Periods - View Only */}
          <div className="p-2 max-h-48 overflow-y-auto">
            <div className="text-[var(--text-xs)] text-[var(--color-text-secondary)] px-2 py-1 mb-1">
              Past Periods
            </div>
            {periods.filter(p => p.type === 'past').reverse().map((p) => (
              <button
                key={p.period}
                onClick={() => {
                  setSelectedPeriod(p.period)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-left transition-colors ${
                  selectedPeriod === p.period
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <History className="w-4 h-4" />
                <span className="flex-1">{p.label}</span>
                <span className="text-[var(--text-xs)] text-[var(--color-text-disabled)]">View</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
