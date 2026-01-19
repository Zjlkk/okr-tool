/**
 * @file Dashboard Layout
 * @description Layout for authenticated dashboard pages with navigation
 */

'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Target, Users, Plus, Settings, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { href: '/my-okr', label: 'My OKR', icon: <Target className="w-5 h-5" /> },
  { href: '/team-okr', label: 'Team OKR', icon: <Users className="w-5 h-5" /> },
  { href: '/create', label: 'Create OKR', icon: <Plus className="w-5 h-5" /> },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session && !session.user?.role) {
      router.push('/onboarding')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
        <div className="loading-bar" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[var(--color-bg-card)] border-r border-[var(--color-border)] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[var(--color-border)]">
          <Link href="/my-okr" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-md)] gradient-primary flex items-center justify-center">
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
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'
                    }
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3 mb-4">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
                <span className="text-[var(--color-text-secondary)] font-medium">
                  {session.user?.name?.[0] || 'U'}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] truncate">
                {session.user?.name}
              </div>
              <div className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
                {session.user?.role === 'LEADER' ? 'Team Leader' : 'Team Member'}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-[var(--text-xs)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-[var(--text-xs)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen p-8">
        {children}
      </main>
    </div>
  )
}
