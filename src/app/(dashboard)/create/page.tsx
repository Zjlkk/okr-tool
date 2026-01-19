/**
 * @file OKR Creation Page
 * @description AI-guided OKR creation with Q&A flow (demo mode - uses mock AI)
 * @see PRD: Function 5 - AI Guided Q&A, Function 6 - Manual Mode
 */

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Card, Textarea } from '@/components/ui'
import { useOKRStore } from '@/stores/useOKRStore'
import { useToastStore } from '@/stores/useToastStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { formatPeriod, getCurrentPeriod } from '@/lib/utils'
import { mockDepartmentGoal, mockAIObjective, mockAIKeyResults } from '@/lib/mock-data'
import {
  Sparkles,
  PenLine,
  ArrowRight,
  ArrowLeft,
  Check,
  RefreshCw,
  Plus,
  Trash2,
} from 'lucide-react'

// Question definitions
const objectiveQuestions = [
  {
    id: 'mostImportantThing',
    question: 'What is the most important thing you want to achieve this bi-monthly period? What is your goal?',
    placeholder: 'e.g., Launch the new user onboarding flow to improve activation rates...',
  },
  {
    id: 'whyImportant',
    question: 'Why is this important? How does it help the department goal?',
    placeholder: 'e.g., This aligns with our department goal of improving user retention by 20%...',
  },
]

const keyResultQuestions = [
  {
    id: 'keyActions',
    question: 'What key actions do you need to take to achieve this objective?',
    placeholder: 'e.g., Design and implement the onboarding flow, run A/B tests, analyze user feedback...',
  },
  {
    id: 'successCriteria',
    question: 'How will you know you have achieved it? What metrics define success?',
    placeholder: 'e.g., Activation rate increases from 40% to 60%, user drop-off reduces by 30%...',
  },
]

export default function CreateOKRPage() {
  const router = useRouter()
  const { success: showSuccess, error: showError } = useToastStore()
  const { setLoading } = useLoadingStore()

  const {
    phase,
    isManualMode,
    objectiveAnswers,
    keyResultAnswers,
    generatedObjective,
    generatedKeyResults,
    confirmedOKRs,
    setPhase,
    setManualMode,
    setObjectiveAnswer,
    setKeyResultAnswer,
    setGeneratedObjective,
    setGeneratedKeyResults,
    confirmKeyResults,
    addManualOKR,
    removeOKR,
    reset,
    resetCurrentAnswers,
  } = useOKRStore()

  const [departmentGoal, setDepartmentGoal] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [showFeedbackInput, setShowFeedbackInput] = useState(false)

  // Manual mode state
  const [manualObjective, setManualObjective] = useState('')
  const [manualKeyResults, setManualKeyResults] = useState(['', '', ''])

  const currentPeriod = getCurrentPeriod()

  // Use mock department goal
  useEffect(() => {
    setDepartmentGoal(mockDepartmentGoal)
  }, [])

  // Mock Generate Objective (simulates AI response)
  const handleGenerateObjective = async () => {
    setIsGenerating(true)
    setLoading(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    setGeneratedObjective(mockAIObjective)
    setIsGenerating(false)
    setLoading(false)
  }

  // Mock Generate Key Results (simulates AI response)
  const handleGenerateKeyResults = async () => {
    setIsGenerating(true)
    setLoading(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    setGeneratedKeyResults(mockAIKeyResults)
    setIsGenerating(false)
    setLoading(false)
  }

  // Mock Optimize with feedback
  const handleOptimize = async () => {
    if (!feedback.trim()) return

    setIsGenerating(true)
    setLoading(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    if (phase === 'objective') {
      // Modify objective based on feedback (mock)
      setGeneratedObjective(`${mockAIObjective} (optimized based on: ${feedback.slice(0, 20)}...)`)
    } else {
      // Modify key results based on feedback (mock)
      setGeneratedKeyResults(mockAIKeyResults.map((kr, i) =>
        i === 0 ? `${kr} (refined)` : kr
      ))
    }
    setFeedback('')
    setShowFeedbackInput(false)
    setIsGenerating(false)
    setLoading(false)
  }

  // Confirm and move to next phase
  const handleConfirmObjective = () => {
    setPhase('keyResults')
    setCurrentQuestionIndex(0)
  }

  const handleConfirmKeyResults = () => {
    confirmKeyResults()
    resetCurrentAnswers()
    setCurrentQuestionIndex(0)
    showSuccess(`Objective ${confirmedOKRs.length + 1} confirmed!`)
  }

  // Manual mode handlers
  const handleAddManualKR = () => {
    setManualKeyResults([...manualKeyResults, ''])
  }

  const handleRemoveManualKR = (index: number) => {
    if (manualKeyResults.length > 1) {
      setManualKeyResults(manualKeyResults.filter((_, i) => i !== index))
    }
  }

  const handleSaveManualOKR = () => {
    if (!manualObjective.trim()) {
      showError('Please enter an objective')
      return
    }
    const validKRs = manualKeyResults.filter((kr) => kr.trim())
    if (validKRs.length === 0) {
      showError('Please enter at least one key result')
      return
    }
    addManualOKR(manualObjective, validKRs)
    setManualObjective('')
    setManualKeyResults(['', '', ''])
    showSuccess(`Objective ${confirmedOKRs.length + 1} added!`)
  }

  // Mock Submit all OKRs
  const handleSubmitAll = async () => {
    if (confirmedOKRs.length < 3) {
      showError('You need at least 3 Objectives to submit')
      return
    }

    setLoading(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    showSuccess('OKRs submitted successfully!')
    reset()
    router.push('/my-okr')
    setLoading(false)
  }

  const questions = phase === 'objective' ? objectiveQuestions : keyResultQuestions
  const currentQuestion = questions[currentQuestionIndex]

  // Get current answer based on phase
  const getCurrentAnswer = (): string => {
    if (!currentQuestion) return ''
    if (phase === 'objective') {
      return objectiveAnswers[currentQuestion.id as keyof typeof objectiveAnswers] || ''
    }
    return keyResultAnswers[currentQuestion.id as keyof typeof keyResultAnswers] || ''
  }
  const currentAnswer = getCurrentAnswer()

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-text-primary)]">
          Create OKR
        </h1>
        <p className="mt-1 text-[var(--color-text-secondary)]">
          {formatPeriod(currentPeriod)}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-sm)] font-medium text-[var(--color-text-primary)]">
            Objectives: {confirmedOKRs.length}/3+
          </span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < confirmedOKRs.length ? 'gradient-primary' : 'bg-[var(--color-border)]'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex-1" />
        <Button
          variant={isManualMode ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setManualMode(!isManualMode)}
          icon={isManualMode ? <Sparkles className="w-4 h-4" /> : <PenLine className="w-4 h-4" />}
        >
          {isManualMode ? 'Use AI Mode' : 'Manual Mode'}
        </Button>
      </div>

      {/* Department Goal */}
      {departmentGoal && (
        <Card className="mb-6 bg-[var(--color-primary)]/5 border-[var(--color-primary)]/20">
          <h3 className="text-[var(--text-sm)] font-semibold text-[var(--color-text-primary)] mb-2">
            Department Goal
          </h3>
          <p className="text-[var(--color-text-secondary)]">{departmentGoal}</p>
        </Card>
      )}

      {/* Manual Mode */}
      {isManualMode ? (
        <Card className="mb-6">
          <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)] mb-4">
            Write Your OKR
          </h3>

          <Textarea
            label="Objective"
            value={manualObjective}
            onChange={(e) => setManualObjective(e.target.value)}
            placeholder="Enter your objective..."
            className="mb-4"
          />

          <div className="mb-4">
            <label className="block mb-2 text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)]">
              Key Results
            </label>
            {manualKeyResults.map((kr, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Textarea
                  value={kr}
                  onChange={(e) => {
                    const newKRs = [...manualKeyResults]
                    newKRs[index] = e.target.value
                    setManualKeyResults(newKRs)
                  }}
                  placeholder={`Key Result ${index + 1}...`}
                  className="min-h-[80px]"
                />
                {manualKeyResults.length > 1 && (
                  <button
                    onClick={() => handleRemoveManualKR(index)}
                    className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-error)]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <Button variant="ghost" size="sm" onClick={handleAddManualKR} icon={<Plus className="w-4 h-4" />}>
              Add Key Result
            </Button>
          </div>

          <Button onClick={handleSaveManualOKR} icon={<Check className="w-4 h-4" />}>
            Save Objective
          </Button>
        </Card>
      ) : (
        /* AI Mode */
        <Card className="mb-6">
          {/* Phase indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className={`px-3 py-1 rounded-full text-[var(--text-xs)] font-medium ${
                phase === 'objective'
                  ? 'gradient-primary text-white'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]'
              }`}
            >
              Phase A: Create Objective
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--color-text-disabled)]" />
            <span
              className={`px-3 py-1 rounded-full text-[var(--text-xs)] font-medium ${
                phase === 'keyResults'
                  ? 'gradient-primary text-white'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]'
              }`}
            >
              Phase B: Define Key Results
            </span>
          </div>

          {/* Question */}
          {!generatedObjective || (phase === 'keyResults' && generatedKeyResults.length === 0) ? (
            <>
              <div className="mb-6">
                <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)] mb-4">
                  {currentQuestion?.question}
                </h3>
                <Textarea
                  value={currentAnswer}
                  onChange={(e) => {
                    if (phase === 'objective') {
                      setObjectiveAnswer(currentQuestion.id as 'mostImportantThing' | 'whyImportant', e.target.value)
                    } else {
                      setKeyResultAnswer(currentQuestion.id as 'keyActions' | 'successCriteria', e.target.value)
                    }
                  }}
                  placeholder={currentQuestion?.placeholder}
                  className="min-h-[120px]"
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>

                {currentQuestionIndex < questions.length - 1 ? (
                  <Button
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                    disabled={!currentAnswer.trim()}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={phase === 'objective' ? handleGenerateObjective : handleGenerateKeyResults}
                    loading={isGenerating}
                    disabled={!currentAnswer.trim()}
                    icon={<Sparkles className="w-4 h-4" />}
                  >
                    Generate with AI
                  </Button>
                )}
              </div>
            </>
          ) : (
            /* Generated Result */
            <>
              <div className="mb-6">
                <h3 className="text-[var(--text-sm)] font-medium text-[var(--color-text-secondary)] mb-2">
                  {phase === 'objective' ? 'Generated Objective' : 'Generated Key Results'}
                </h3>

                {phase === 'objective' ? (
                  <div className="p-4 bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)]">
                    <p className="text-[var(--color-text-primary)]">{generatedObjective}</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {generatedKeyResults.map((kr, index) => (
                      <li
                        key={index}
                        className="p-4 bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)] flex items-start gap-3"
                      >
                        <span className="text-[var(--text-xs)] font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded">
                          KR{index + 1}
                        </span>
                        <p className="text-[var(--color-text-primary)] flex-1">{kr}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Feedback Input */}
              {showFeedbackInput && (
                <div className="mb-4">
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="What would you like to change?"
                    className="min-h-[80px]"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={handleOptimize}
                      loading={isGenerating}
                      disabled={!feedback.trim()}
                      icon={<RefreshCw className="w-4 h-4" />}
                    >
                      Regenerate
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setShowFeedbackInput(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setShowFeedbackInput(true)}
                  disabled={showFeedbackInput}
                  icon={<RefreshCw className="w-4 h-4" />}
                >
                  Not satisfied? Improve
                </Button>

                <Button
                  onClick={phase === 'objective' ? handleConfirmObjective : handleConfirmKeyResults}
                  icon={<Check className="w-4 h-4" />}
                >
                  {phase === 'objective' ? 'Confirm & Continue' : 'Confirm Key Results'}
                </Button>
              </div>
            </>
          )}
        </Card>
      )}

      {/* Confirmed OKRs */}
      {confirmedOKRs.length > 0 && (
        <div className="mb-6">
          <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-primary)] mb-4">
            Confirmed Objectives ({confirmedOKRs.length})
          </h3>
          <div className="space-y-3">
            {confirmedOKRs.map((okr, index) => (
              <Card key={index} className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[var(--text-xs)] font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded">
                        O{index + 1}
                      </span>
                    </div>
                    <p className="text-[var(--color-text-primary)] mb-2">{okr.objective}</p>
                    <ul className="space-y-1">
                      {okr.keyResults.map((kr, krIndex) => (
                        <li key={kr.id} className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                          <span className="text-[var(--color-text-disabled)]">KR{krIndex + 1}:</span> {kr.content}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {confirmedOKRs.length > 3 && (
                    <button
                      onClick={() => removeOKR(index)}
                      className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-error)]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
          {confirmedOKRs.length < 3
            ? `Need ${3 - confirmedOKRs.length} more objective(s) to submit`
            : 'Ready to submit!'}
        </p>
        <Button
          onClick={handleSubmitAll}
          disabled={confirmedOKRs.length < 3}
          size="lg"
        >
          Submit All OKRs
        </Button>
      </div>
    </div>
  )
}
