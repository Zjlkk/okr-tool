/**
 * @file Dashboard Layout
 * @description Layout for dashboard pages with navigation (demo mode - no auth)
 */

'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Target, Users, Plus, Settings, LogOut, Globe, ChevronDown, ChevronRight } from 'lucide-react'
import { mockUser, mockDepartments } from '@/lib/mock-data'
import { useLanguageStore } from '@/stores/useLanguageStore'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage, t } = useLanguageStore()
  const [isTeamOKRExpanded, setIsTeamOKRExpanded] = useState(pathname.startsWith('/team-okr'))

  // Use mock user for demo
  const user = mockUser

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en')
  }

  // Get current department from URL
  const currentDept = pathname.startsWith('/team-okr/')
    ? pathname.split('/team-okr/')[1]
    : null

  const handleTeamOKRClick = () => {
    setIsTeamOKRExpanded(!isTeamOKRExpanded)
    if (!isTeamOKRExpanded) {
      // Navigate to first department when expanding
      router.push('/team-okr/ceo')
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Top Bar with Language Switcher */}
      <div className="fixed top-0 right-0 left-64 h-14 bg-[var(--color-bg-card)] border-b border-[var(--color-border)] z-10 flex items-center justify-end px-6">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] text-[var(--text-sm)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span className="font-medium">{language === 'en' ? 'EN' : '中文'}</span>
        </button>
      </div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[var(--color-bg-card)] border-r border-[var(--color-border)] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[var(--color-border)]">
          <Link href="/my-okr">
            <span className="text-[var(--text-xl)] font-semibold text-[var(--color-text-primary)]">
              OKR Tool
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {/* My OKR */}
            <li>
              <Link
                href="/my-okr"
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)]
                  transition-all duration-[var(--duration-fast)]
                  ${pathname === '/my-okr'
                    ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'
                  }
                `}
              >
                <Target className="w-5 h-5" />
                <span className="font-medium">{t('nav.myOkr')}</span>
              </Link>
            </li>

            {/* Team OKR - Expandable */}
            <li>
              <button
                onClick={handleTeamOKRClick}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)]
                  transition-all duration-[var(--duration-fast)]
                  ${pathname.startsWith('/team-okr')
                    ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'
                  }
                `}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium flex-1 text-left">{t('nav.teamOkr')}</span>
                {isTeamOKRExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {/* Department Tree */}
              {isTeamOKRExpanded && (
                <div className="ml-4 mt-1 relative">
                  {/* Vertical line */}
                  <div className="absolute left-[18px] top-0 bottom-2 w-px bg-[var(--color-border)]" />

                  <ul className="space-y-0.5">
                    {mockDepartments.map((dept, index) => (
                      <li key={dept.id} className="relative">
                        {/* Horizontal connector line */}
                        <div className="absolute left-[18px] top-1/2 w-3 h-px bg-[var(--color-border)]" />

                        <Link
                          href={`/team-okr/${dept.id}`}
                          className={`
                            flex items-center gap-2 pl-9 pr-3 py-2 rounded-[var(--radius-md)]
                            transition-all duration-[var(--duration-fast)] text-[var(--text-sm)]
                            ${currentDept === dept.id
                              ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]'
                            }
                          `}
                        >
                          <span className={`w-2 h-2 rounded-full ${currentDept === dept.id ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'}`} />
                          <span>{dept.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* Create OKR */}
            <li>
              <Link
                href="/create"
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)]
                  transition-all duration-[var(--duration-fast)]
                  ${pathname === '/create'
                    ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'
                  }
                `}
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">{t('nav.createOkr')}</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
              <span className="text-[var(--color-text-secondary)] font-medium">
                {user.name?.[0] || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] truncate">
                {user.name}
              </div>
              <div className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
                {user.role === 'LEADER' ? t('common.teamLeader') : t('common.teamMember')}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-[var(--text-xs)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
            >
              <Settings className="w-4 h-4" />
              {t('nav.settings')}
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-[var(--text-xs)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {t('nav.signOut')}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen pt-24 px-8 pb-8">
        {children}
      </main>
    </div>
  )
}
