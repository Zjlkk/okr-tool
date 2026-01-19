/**
 * @file Dashboard Layout
 * @description Layout for dashboard pages with navigation (demo mode - no auth)
 */

'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Target, Users, Plus, Settings, LogOut, Globe } from 'lucide-react'
import { mockUser } from '@/lib/mock-data'
import { useLanguageStore } from '@/stores/useLanguageStore'

interface NavItem {
  href: string
  labelKey: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { href: '/my-okr', labelKey: 'nav.myOkr', icon: <Target className="w-5 h-5" /> },
  { href: '/team-okr', labelKey: 'nav.teamOkr', icon: <Users className="w-5 h-5" /> },
  { href: '/create', labelKey: 'nav.createOkr', icon: <Plus className="w-5 h-5" /> },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguageStore()

  // Use mock user for demo
  const user = mockUser

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en')
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
          <Link href="/my-okr" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-md)] gradient-primary flex items-center justify-center shadow-lg" style={{ boxShadow: 'var(--glow-primary-sm)' }}>
              <span className="text-white font-bold">O</span>
            </div>
            <span className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)]">
              OKR Tool
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)]
                    transition-all duration-[var(--duration-fast)]
                    ${pathname === item.href
                      ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'
                    }
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{t(item.labelKey)}</span>
                </Link>
              </li>
            ))}
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
      <main className="ml-64 min-h-screen pt-14 p-8">
        {children}
      </main>
    </div>
  )
}
