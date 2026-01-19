/**
 * @file Onboarding Page
 * @description First-time user setup - select role and department
 * @see PRD: Function 2 - Identity Selection
 */

'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button, Card, Select } from '@/components/ui'
import { useToastStore } from '@/stores/useToastStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { Users, UserCheck } from 'lucide-react'

type Role = 'LEADER' | 'MEMBER'

interface Department {
  id: string
  name: string
}

export default function OnboardingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { error: showError, success: showSuccess } = useToastStore()
  const { setLoading } = useLoadingStore()

  const [role, setRole] = useState<Role | null>(null)
  const [departmentId, setDepartmentId] = useState('')
  const [departments, setDepartments] = useState<Department[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already set up
  useEffect(() => {
    if (session?.user?.role && session?.user?.departmentId) {
      router.push('/my-okr')
    }
  }, [session, router])

  // Fetch departments
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await fetch('/api/department')
        const data = await res.json()
        if (data.success) {
          setDepartments(data.data)
        }
      } catch {
        // Use default departments if API fails
        setDepartments([
          { id: 'product', name: 'Product' },
          { id: 'design', name: 'Design' },
          { id: 'engineering', name: 'Engineering' },
          { id: 'gtm', name: 'GTM' },
          { id: 'operations', name: 'Operations' },
        ])
      }
    }
    fetchDepartments()
  }, [])

  const handleSubmit = async () => {
    if (!role || !departmentId) {
      showError('Please select both role and department')
      return
    }

    setIsSubmitting(true)
    setLoading(true)

    try {
      const res = await fetch('/api/user/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, departmentId }),
      })

      const data = await res.json()

      if (data.success) {
        showSuccess('Setup complete!')
        router.push('/my-okr')
      } else {
        showError(data.error || 'Setup failed')
      }
    } catch {
      showError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
        <div className="loading-bar" />
      </div>
    )
  }

  if (!session) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)] p-4">
      <Card className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-text-primary)]">
            Welcome, {session.user?.name}!
          </h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Let&apos;s set up your profile to get started.
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block mb-3 text-[var(--text-sm)] font-medium text-[var(--color-text-primary)]">
            What&apos;s your role?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setRole('LEADER')}
              className={`
                p-4 rounded-[var(--radius-lg)] border-2 transition-all
                ${role === 'LEADER'
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                  : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                }
              `}
            >
              <UserCheck className={`w-8 h-8 mx-auto mb-2 ${role === 'LEADER' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}`} />
              <div className={`text-[var(--text-sm)] font-medium ${role === 'LEADER' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)]'}`}>
                Team Leader
              </div>
              <div className="text-[var(--text-xs)] text-[var(--color-text-secondary)] mt-1">
                Set department goals
              </div>
            </button>
            <button
              onClick={() => setRole('MEMBER')}
              className={`
                p-4 rounded-[var(--radius-lg)] border-2 transition-all
                ${role === 'MEMBER'
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                  : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                }
              `}
            >
              <Users className={`w-8 h-8 mx-auto mb-2 ${role === 'MEMBER' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}`} />
              <div className={`text-[var(--text-sm)] font-medium ${role === 'MEMBER' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)]'}`}>
                Team Member
              </div>
              <div className="text-[var(--text-xs)] text-[var(--color-text-secondary)] mt-1">
                Create personal OKRs
              </div>
            </button>
          </div>
        </div>

        {/* Department Selection */}
        <div className="mb-8">
          <Select
            label="Select your department"
            placeholder="Choose a department"
            options={departments.map((d) => ({ value: d.id, label: d.name }))}
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          />
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={!role || !departmentId}
          size="lg"
          className="w-full"
        >
          Complete Setup
        </Button>

        {/* Note */}
        <p className="mt-4 text-[var(--text-xs)] text-[var(--color-text-disabled)] text-center">
          This selection is permanent. Contact admin if you need to change it later.
        </p>
      </Card>
    </div>
  )
}
