/**
 * @file Login Page
 * @description Google OAuth login page (demo mode - simulated login)
 * @see PRD: Function 1 - Google Login
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/useUserStore'
import { Button } from '@/components/ui'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoggedIn, isOnboarded } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)

  // If already logged in and onboarded, redirect to dashboard
  if (isLoggedIn && isOnboarded) {
    router.push('/my-okr')
    return null
  }

  // If logged in but not onboarded, redirect to onboarding
  if (isLoggedIn && !isOnboarded) {
    router.push('/onboarding')
    return null
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    // Simulate OAuth delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Demo: Create a mock user from "Google OAuth"
    login('Demo User', 'demo@company.com')

    setIsLoading(false)
    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-[var(--text-3xl)] font-bold text-[var(--color-text-primary)] mb-2">
            OKR Tool
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Manage your objectives and key results
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-8">
          <h2 className="text-[var(--text-xl)] font-semibold text-[var(--color-text-primary)] text-center mb-6">
            Sign in to continue
          </h2>

          {/* Google Login Button */}
          <Button
            onClick={handleGoogleLogin}
            loading={isLoading}
            className="w-full h-12 text-[var(--text-base)]"
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            }
          >
            Continue with Google
          </Button>

          {/* Demo Notice */}
          <p className="mt-6 text-center text-[var(--text-xs)] text-[var(--color-text-disabled)]">
            Demo Mode: Click to simulate Google login
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-[var(--text-xs)] text-[var(--color-text-disabled)]">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
