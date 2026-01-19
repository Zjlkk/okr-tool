/**
 * @file Team OKR Page
 * @description View team members' OKRs by department
 * @see PRD: Function 10 - Team OKR
 */

'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, Tabs, Button } from '@/components/ui'
import { useToastStore } from '@/stores/useToastStore'
import { formatPeriod, getCurrentPeriod } from '@/lib/utils'
import { Bell, ChevronDown, ChevronUp, User } from 'lucide-react'

interface KeyResult {
  id: string
  content: string
}

interface UserOKR {
  id: string
  userId: string
  userName: string
  userImage?: string
  objective: string
  keyResults: KeyResult[]
  status: 'DRAFT' | 'SUBMITTED'
}

interface Department {
  id: string
  name: string
  hasGoal: boolean
  leaderId?: string
  leaderName?: string
}

export default function TeamOKRPage() {
  const { data: session } = useSession()
  const { success, error } = useToastStore()

  const [departments, setDepartments] = useState<Department[]>([])
  const [activeDepartment, setActiveDepartment] = useState<string>('')
  const [teamOKRs, setTeamOKRs] = useState<UserOKR[]>([])
  const [departmentGoal, setDepartmentGoal] = useState<string>('')
  const [expandedOKR, setExpandedOKR] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isReminding, setIsReminding] = useState(false)

  const currentPeriod = getCurrentPeriod()

  // Fetch departments
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await fetch('/api/department')
        const data = await res.json()
        if (data.success) {
          setDepartments(data.data)
          if (data.data.length > 0) {
            setActiveDepartment(data.data[0].id)
          }
        }
      } catch {
        // Use default departments
        const defaultDepts = [
          { id: 'product', name: 'Product', hasGoal: false },
          { id: 'design', name: 'Design', hasGoal: false },
          { id: 'engineering', name: 'Engineering', hasGoal: false },
          { id: 'gtm', name: 'GTM', hasGoal: false },
        ]
        setDepartments(defaultDepts)
        setActiveDepartment('product')
      }
    }
    fetchDepartments()
  }, [])

  // Fetch team OKRs when department changes
  useEffect(() => {
    async function fetchTeamOKRs() {
      if (!activeDepartment) return

      setIsLoading(true)
      try {
        const res = await fetch(`/api/okr/team?departmentId=${activeDepartment}&period=${currentPeriod}`)
        const data = await res.json()
        if (data.success) {
          setTeamOKRs(data.data.okrs || [])
          setDepartmentGoal(data.data.departmentGoal || '')
        }
      } catch (err) {
        console.error('Failed to fetch team OKRs:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTeamOKRs()
  }, [activeDepartment, currentPeriod])

  const handleRemindLeader = async () => {
    const dept = departments.find((d) => d.id === activeDepartment)
    if (!dept?.leaderId) return

    setIsReminding(true)
    try {
      const res = await fetch('/api/reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toUserId: dept.leaderId,
          departmentId: activeDepartment,
          period: currentPeriod,
        }),
      })
      const data = await res.json()
      if (data.success) {
        success('Reminder sent to leader!')
      } else {
        error(data.error || 'Failed to send reminder')
      }
    } catch {
      error('Failed to send reminder')
    } finally {
      setIsReminding(false)
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedOKR(expandedOKR === id ? null : id)
  }

  const currentDept = departments.find((d) => d.id === activeDepartment)

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-text-primary)]">
          Team OKR
        </h1>
        <p className="mt-1 text-[var(--color-text-secondary)]">
          {formatPeriod(currentPeriod)}
        </p>
      </div>

      {/* Department Tabs */}
      <Tabs
        tabs={departments.map((d) => ({ id: d.id, label: d.name }))}
        defaultTab={activeDepartment}
        onChange={setActiveDepartment}
        className="mb-6"
      />

      {/* Department Goal */}
      {departmentGoal ? (
        <Card className="mb-6 bg-[var(--color-primary)]/5 border-[var(--color-primary)]/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[var(--text-xs)] font-bold">G</span>
            </div>
            <div>
              <h3 className="text-[var(--text-sm)] font-semibold text-[var(--color-text-primary)] mb-1">
                Department Goal
              </h3>
              <p className="text-[var(--color-text-secondary)]">{departmentGoal}</p>
            </div>
          </div>
        </Card>
      ) : currentDept && !currentDept.hasGoal ? (
        <Card className="mb-6 bg-[var(--color-warning-light)] border-[var(--color-warning)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[var(--text-sm)] font-semibold text-[var(--color-warning)] mb-1">
                Department Goal Not Set
              </h3>
              <p className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
                Leader needs to set the department goal for this period.
              </p>
            </div>
            {session?.user?.role === 'MEMBER' && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleRemindLeader}
                loading={isReminding}
                icon={<Bell className="w-4 h-4" />}
              >
                Remind Leader
              </Button>
            )}
          </div>
        </Card>
      ) : null}

      {/* Team OKRs */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="loading-bar" />
        </div>
      ) : teamOKRs.length === 0 ? (
        <Card className="text-center py-12">
          <User className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-disabled)]" />
          <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)] mb-2">
            No OKRs yet
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            Team members haven&apos;t created OKRs for this period yet.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {teamOKRs.map((okr) => (
            <Card key={okr.id} hoverable className="overflow-hidden">
              {/* Header */}
              <div
                className="flex items-start justify-between cursor-pointer"
                onClick={() => toggleExpand(okr.id)}
              >
                <div className="flex items-start gap-3 flex-1">
                  {okr.userImage ? (
                    <img
                      src={okr.userImage}
                      alt={okr.userName}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
                      <span className="text-[var(--color-text-secondary)] font-medium">
                        {okr.userName?.[0] || 'U'}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[var(--text-sm)] font-medium text-[var(--color-text-primary)]">
                        {okr.userName}
                      </span>
                      <span
                        className={`text-[var(--text-xs)] px-2 py-0.5 rounded ${
                          okr.status === 'SUBMITTED'
                            ? 'text-[var(--color-success)] bg-[var(--color-success-light)]'
                            : 'text-[var(--color-warning)] bg-[var(--color-warning-light)]'
                        }`}
                      >
                        {okr.status === 'SUBMITTED' ? 'Submitted' : 'Draft'}
                      </span>
                    </div>
                    <h3 className="text-[var(--color-text-primary)]">{okr.objective}</h3>
                    <p className="text-[var(--text-xs)] text-[var(--color-text-secondary)] mt-1">
                      {okr.keyResults.length} Key Results
                    </p>
                  </div>
                </div>
                <div className="ml-4">
                  {expandedOKR === okr.id ? (
                    <ChevronUp className="w-5 h-5 text-[var(--color-text-secondary)]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--color-text-secondary)]" />
                  )}
                </div>
              </div>

              {/* Key Results */}
              {expandedOKR === okr.id && (
                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <ul className="space-y-3">
                    {okr.keyResults.map((kr, index) => (
                      <li key={kr.id} className="flex items-start gap-3">
                        <span className="text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded">
                          KR{index + 1}
                        </span>
                        <span className="text-[var(--text-sm)] text-[var(--color-text-primary)] flex-1">
                          {kr.content}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
