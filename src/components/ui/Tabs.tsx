/**
 * @file Tabs Component
 * @description Tab navigation component for switching between views
 */

'use client'

import { useState } from 'react'

interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (tabId: string) => void
  className?: string
}

export function Tabs({ tabs, defaultTab, onChange, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  return (
    <div className={`flex gap-6 border-b border-[var(--color-border)] ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`
            py-3 text-[var(--text-sm)] font-medium
            border-b-2 -mb-px
            transition-all duration-[var(--duration-fast)]
            ${activeTab === tab.id
              ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
              : 'text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-primary)]'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
