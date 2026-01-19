/**
 * @file Onboarding Page
 * @description First-time user setup - select role and team
 * @see PRD: Function 2 - Identity Selection
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore, UserRole } from '@/stores/useUserStore'
import { Button, Card } from '@/components/ui'
import { mockDepartments } from '@/lib/mock-data'
import { Crown, Users, Check, ArrowRight, ArrowLeft } from 'lucide-react'

type Step = 'role' | 'team'

export default function OnboardingPage() {
  const router = useRouter()
  const { user, isLoggedIn, isOnboarded, setRole, setDepartment, completeOnboarding } = useUserStore()
  const [step, setStep] = useState<Step>('role')
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    router.push('/login')
    return null
  }

  // If already onboarded, redirect to dashboard
  if (isOnboarded) {
    router.push('/my-okr')
    return null
  }

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
  }

  const handleDepartmentSelect = (deptId: string) => {
    setSelectedDepartment(deptId)
  }

  const handleNextStep = () => {
    if (step === 'role' && selectedRole) {
      setRole(selectedRole)
      setStep('team')
    }
  }

  const handlePrevStep = () => {
    if (step === 'team') {
      setStep('role')
    }
  }

  const handleComplete = async () => {
    if (!selectedDepartment) return

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    const dept = mockDepartments.find(d => d.id === selectedDepartment)
    if (dept) {
      setDepartment(dept.id, dept.name)
    }
    completeOnboarding()

    setIsLoading(false)
    router.push('/my-okr')
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-text-primary)] mb-2">
            Welcome to OKR Tool
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            {user?.name ? `Hi ${user.name.split(' ')[0]}! ` : ''}Let's set up your account
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 'role'
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-success)] text-white'
            }`}>
              {step === 'role' ? '1' : <Check className="w-4 h-4" />}
            </div>
            <span className={`text-[var(--text-sm)] ${step === 'role' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-success)]'}`}>
              Select Role
            </span>
          </div>

          <div className="w-12 h-px bg-[var(--color-border)]" />

          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 'team'
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]'
            }`}>
              2
            </div>
            <span className={`text-[var(--text-sm)] ${step === 'team' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
              Select Team
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-8">
          {step === 'role' ? (
            <>
              <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)] text-center mb-6">
                What is your role?
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Leader Option */}
                <button
                  onClick={() => handleRoleSelect('LEADER')}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    selectedRole === 'LEADER'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                      : 'border-[var(--color-border)] hover:border-[var(--color-text-secondary)]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    selectedRole === 'LEADER'
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]'
                  }`}>
                    <Crown className="w-6 h-6" />
                  </div>
                  <h3 className="text-[var(--text-base)] font-semibold text-[var(--color-text-primary)] mb-1">
                    Team Leader
                  </h3>
                  <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                    Set department goals, review team OKRs, and guide your team's objectives
                  </p>
                </button>

                {/* Member Option */}
                <button
                  onClick={() => handleRoleSelect('MEMBER')}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    selectedRole === 'MEMBER'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                      : 'border-[var(--color-border)] hover:border-[var(--color-text-secondary)]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    selectedRole === 'MEMBER'
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]'
                  }`}>
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-[var(--text-base)] font-semibold text-[var(--color-text-primary)] mb-1">
                    Team Member
                  </h3>
                  <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                    Create personal OKRs aligned with department goals and track your progress
                  </p>
                </button>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleNextStep}
                  disabled={!selectedRole}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)] text-center mb-2">
                Select your team
              </h2>
              <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)] text-center mb-6">
                {selectedRole === 'LEADER'
                  ? "Choose the team you'll be leading"
                  : "Choose the team you belong to"
                }
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {mockDepartments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => handleDepartmentSelect(dept.id)}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      selectedDepartment === dept.id
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                        : 'border-[var(--color-border)] hover:border-[var(--color-text-secondary)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-[var(--text-sm)] font-semibold text-[var(--color-text-primary)]">
                          {dept.name}
                        </h3>
                        {dept.leaderName && selectedRole === 'MEMBER' && (
                          <p className="text-[var(--text-xs)] text-[var(--color-text-secondary)] mt-0.5">
                            Led by {dept.leaderName}
                          </p>
                        )}
                      </div>
                      {selectedDepartment === dept.id && (
                        <div className="w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={handlePrevStep}
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={!selectedDepartment}
                  loading={isLoading}
                  icon={<Check className="w-4 h-4" />}
                >
                  Complete Setup
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
