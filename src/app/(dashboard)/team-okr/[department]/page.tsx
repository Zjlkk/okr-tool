/**
 * @file Team OKR Department Page
 * @description View team OKRs for a specific department with tree visualization
 */

'use client'

import { use, useState, useEffect } from 'react'
import { OKRTree, Card } from '@/components/ui'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { formatPeriod, getCurrentPeriod } from '@/lib/utils'
import { mockDepartments, mockLeaderOKRs, mockTeamOKRsByDepartment } from '@/lib/mock-data'
import { Crown, Users } from 'lucide-react'

interface PageProps {
  params: Promise<{ department: string }>
}

export default function TeamOKRDepartmentPage({ params }: PageProps) {
  const { department } = use(params)
  const { t } = useLanguageStore()
  const [isLoading, setIsLoading] = useState(true)

  const currentPeriod = getCurrentPeriod()
  const currentDept = mockDepartments.find((d) => d.id === department)
  const leaderOKRs = mockLeaderOKRs[department] || []
  const teamOKRs = mockTeamOKRsByDepartment[department] || []

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [department])

  if (!currentDept) {
    return (
      <div className="flex items-center justify-center py-20">
        <Card className="text-center py-12 px-8">
          <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)] mb-2">
            Department Not Found
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            Please select a valid department from the sidebar.
          </p>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="loading-bar" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-text-primary)]">
          {currentDept.name} {t('teamOkr.title')}
        </h1>
        <p className="mt-1 text-[var(--color-text-secondary)]">
          {formatPeriod(currentPeriod)}
        </p>
      </div>

      {/* Leader's OKR Section */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Crown className="w-5 h-5 text-[var(--color-primary)]" />
          <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)]">
            {t('teamOkr.leaderOkr')}
          </h2>
        </div>

        {leaderOKRs.length > 0 && currentDept.leaderName ? (
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6">
            <OKRTree
              name={currentDept.leaderName}
              isLeader={true}
              okrs={leaderOKRs}
            />
          </div>
        ) : (
          <Card className="text-center py-8">
            <p className="text-[var(--color-text-secondary)]">
              No leader OKRs available.
            </p>
          </Card>
        )}
      </div>

      {/* Team Members' OKR Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-[var(--color-text-secondary)]" />
          <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)]">
            {t('teamOkr.teamMembersOkr')}
          </h2>
        </div>

        {teamOKRs.length === 0 ? (
          <Card className="text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-disabled)]" />
            <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)] mb-2">
              {t('teamOkr.noOkrs')}
            </h3>
            <p className="text-[var(--color-text-secondary)]">
              {t('teamOkr.noOkrsDesc')}
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {teamOKRs.map((member) => (
              <div
                key={member.userId}
                className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6"
              >
                <OKRTree
                  name={member.userName}
                  avatar={member.userImage}
                  isLeader={false}
                  okrs={[{
                    id: member.id,
                    objective: member.objective,
                    keyResults: member.keyResults,
                    status: member.status,
                  }]}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
