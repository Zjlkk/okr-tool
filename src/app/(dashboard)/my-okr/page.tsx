/**
 * @file My OKR Page
 * @description View and manage personal OKRs (demo mode - uses mock data)
 * @see PRD: Function 9 - My OKR
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, Card, Textarea } from '@/components/ui'
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react'
import { formatPeriod, getCurrentPeriod } from '@/lib/utils'
import { mockOKRs } from '@/lib/mock-data'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useToastStore } from '@/stores/useToastStore'

interface KeyResult {
  id: string
  content: string
  progress?: number
}

interface OKR {
  id: string
  objective: string
  keyResults: KeyResult[]
  status: 'DRAFT' | 'SUBMITTED'
}

interface EditFormData {
  objective: string
  keyResults: string[]
}

export default function MyOKRPage() {
  const [okrs, setOkrs] = useState<OKR[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<EditFormData>({ objective: '', keyResults: [] })
  const { t } = useLanguageStore()
  const { success: showSuccess } = useToastStore()

  const currentPeriod = getCurrentPeriod()

  useEffect(() => {
    // Simulate loading with mock data
    const timer = setTimeout(() => {
      setOkrs(mockOKRs)
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const canDelete = okrs.length > 3

  const handleStartEdit = (index: number) => {
    const okr = okrs[index]
    setEditForm({
      objective: okr.objective,
      keyResults: okr.keyResults.map(kr => kr.content),
    })
    setEditingIndex(index)
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditForm({ objective: '', keyResults: [] })
  }

  const handleSaveEdit = () => {
    if (editingIndex === null) return

    const updatedOkrs = [...okrs]
    updatedOkrs[editingIndex] = {
      ...updatedOkrs[editingIndex],
      objective: editForm.objective,
      keyResults: editForm.keyResults.map((content, i) => ({
        id: updatedOkrs[editingIndex].keyResults[i]?.id || `kr-${Date.now()}-${i}`,
        content,
      })),
    }
    setOkrs(updatedOkrs)
    setEditingIndex(null)
    setEditForm({ objective: '', keyResults: [] })
    showSuccess(t('myOkr.editSuccess'))
  }

  const handleEditKeyResult = (krIndex: number, value: string) => {
    const newKeyResults = [...editForm.keyResults]
    newKeyResults[krIndex] = value
    setEditForm({ ...editForm, keyResults: newKeyResults })
  }

  const handleDeleteOKR = (index: number) => {
    const updatedOkrs = okrs.filter((_, i) => i !== index)
    setOkrs(updatedOkrs)
    showSuccess(t('myOkr.deleteSuccess'))
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-text-primary)]">
            {t('myOkr.title')}
          </h1>
          <p className="mt-1 text-[var(--color-text-secondary)]">
            {formatPeriod(currentPeriod)}
          </p>
        </div>
        <Link href="/create">
          <Button icon={<Plus className="w-4 h-4" />}>
            {t('myOkr.addObjective')}
          </Button>
        </Link>
      </div>

      {/* OKR List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="loading-bar" />
        </div>
      ) : okrs.length === 0 ? (
        <Card className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
            <Plus className="w-8 h-8 text-[var(--color-text-disabled)]" />
          </div>
          <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)] mb-2">
            {t('myOkr.noOkrs')}
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-6">
            {t('myOkr.startCreating')}
          </p>
          <Link href="/create">
            <Button>{t('myOkr.createFirst')}</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {okrs.map((okr, index) => (
            <Card key={okr.id} className="overflow-hidden">
              {editingIndex === index ? (
                /* Edit Mode */
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[var(--text-xs)] font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded">
                        O{index + 1}
                      </span>
                      <span className="text-[var(--text-sm)] font-medium text-[var(--color-text-primary)]">
                        {t('myOkr.editing')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCancelEdit}
                        className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-error)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)] transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-success)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)] transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)]">
                      {t('create.objective')}
                    </label>
                    <Textarea
                      value={editForm.objective}
                      onChange={(e) => setEditForm({ ...editForm, objective: e.target.value })}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border)]">
                    <label className="block mb-2 text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)]">
                      {t('create.keyResults')}
                    </label>
                    <ul className="space-y-3">
                      {editForm.keyResults.map((kr, krIndex) => (
                        <li key={krIndex} className="flex items-start gap-3">
                          <span className="text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded mt-2">
                            KR{krIndex + 1}
                          </span>
                          <Textarea
                            value={kr}
                            onChange={(e) => handleEditKeyResult(krIndex, e.target.value)}
                            className="flex-1 min-h-[60px]"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                /* View Mode */
                <>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[var(--text-xs)] font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded">
                          O{index + 1}
                        </span>
                        <span
                          className={`text-[var(--text-xs)] px-2 py-1 rounded ${
                            okr.status === 'SUBMITTED'
                              ? 'text-[var(--color-success)] bg-[var(--color-success-light)]'
                              : 'text-[var(--color-warning)] bg-[var(--color-warning-light)]'
                          }`}
                        >
                          {okr.status === 'SUBMITTED' ? t('status.submitted') : t('status.draft')}
                        </span>
                      </div>
                      <h3 className="text-[var(--text-base)] font-semibold text-[var(--color-text-primary)]">
                        {okr.objective}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleStartEdit(index)}
                        className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)] transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {canDelete && (
                        <button
                          onClick={() => handleDeleteOKR(index)}
                          className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error-light)] rounded-[var(--radius-md)] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                    <ul className="space-y-3">
                      {okr.keyResults.map((kr, krIndex) => (
                        <li key={kr.id} className="flex items-start gap-3">
                          <span className="text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded mt-0.5">
                            KR{krIndex + 1}
                          </span>
                          <span className="text-[var(--text-sm)] text-[var(--color-text-primary)] flex-1">
                            {kr.content}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </Card>
          ))}

          {/* Minimum OKRs Warning */}
          {okrs.length < 3 && (
            <div className="p-4 bg-[var(--color-warning-light)] border border-[var(--color-warning)] rounded-[var(--radius-md)]">
              <p className="text-[var(--text-sm)] text-[var(--color-warning)]">
                {t('myOkr.minimumWarning').replace('{current}', String(okrs.length))}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
