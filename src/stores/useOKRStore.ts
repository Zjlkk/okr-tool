/**
 * @file OKR Store
 * @description Zustand store for OKR creation and management state
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface KeyResult {
  id: string
  content: string
}

interface ConfirmedOKR {
  objective: string
  keyResults: KeyResult[]
}

interface OKRCreationState {
  // Current creation state
  phase: 'objective' | 'keyResults'
  currentObjectiveIndex: number
  isManualMode: boolean

  // Answers for current O/KR
  objectiveAnswers: {
    mostImportantThing: string
    whyImportant: string
  }
  keyResultAnswers: {
    keyActions: string
    successCriteria: string
  }

  // Generated content
  generatedObjective: string
  generatedKeyResults: string[]

  // Confirmed OKRs
  confirmedOKRs: ConfirmedOKR[]

  // Actions
  setPhase: (phase: 'objective' | 'keyResults') => void
  setManualMode: (isManual: boolean) => void
  setObjectiveAnswer: (key: 'mostImportantThing' | 'whyImportant', value: string) => void
  setKeyResultAnswer: (key: 'keyActions' | 'successCriteria', value: string) => void
  setGeneratedObjective: (objective: string) => void
  setGeneratedKeyResults: (keyResults: string[]) => void
  confirmObjective: () => void
  confirmKeyResults: () => void
  addManualOKR: (objective: string, keyResults: string[]) => void
  removeOKR: (index: number) => void
  reset: () => void
  resetCurrentAnswers: () => void
}

const initialState = {
  phase: 'objective' as const,
  currentObjectiveIndex: 0,
  isManualMode: false,
  objectiveAnswers: {
    mostImportantThing: '',
    whyImportant: '',
  },
  keyResultAnswers: {
    keyActions: '',
    successCriteria: '',
  },
  generatedObjective: '',
  generatedKeyResults: [],
  confirmedOKRs: [],
}

export const useOKRStore = create<OKRCreationState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPhase: (phase) => set({ phase }),

      setManualMode: (isManual) => set({ isManualMode: isManual }),

      setObjectiveAnswer: (key, value) =>
        set((state) => ({
          objectiveAnswers: { ...state.objectiveAnswers, [key]: value },
        })),

      setKeyResultAnswer: (key, value) =>
        set((state) => ({
          keyResultAnswers: { ...state.keyResultAnswers, [key]: value },
        })),

      setGeneratedObjective: (objective) => set({ generatedObjective: objective }),

      setGeneratedKeyResults: (keyResults) => set({ generatedKeyResults: keyResults }),

      confirmObjective: () => {
        const { generatedObjective } = get()
        if (generatedObjective) {
          set({ phase: 'keyResults' })
        }
      },

      confirmKeyResults: () => {
        const { generatedObjective, generatedKeyResults, confirmedOKRs } = get()
        if (generatedObjective && generatedKeyResults.length > 0) {
          const newOKR: ConfirmedOKR = {
            objective: generatedObjective,
            keyResults: generatedKeyResults.map((kr, index) => ({
              id: `kr-${Date.now()}-${index}`,
              content: kr,
            })),
          }
          set({
            confirmedOKRs: [...confirmedOKRs, newOKR],
            phase: 'objective',
            currentObjectiveIndex: confirmedOKRs.length + 1,
            generatedObjective: '',
            generatedKeyResults: [],
            objectiveAnswers: { mostImportantThing: '', whyImportant: '' },
            keyResultAnswers: { keyActions: '', successCriteria: '' },
          })
        }
      },

      addManualOKR: (objective, keyResults) => {
        const { confirmedOKRs } = get()
        const newOKR: ConfirmedOKR = {
          objective,
          keyResults: keyResults.map((kr, index) => ({
            id: `kr-${Date.now()}-${index}`,
            content: kr,
          })),
        }
        set({
          confirmedOKRs: [...confirmedOKRs, newOKR],
          currentObjectiveIndex: confirmedOKRs.length + 1,
        })
      },

      removeOKR: (index) => {
        const { confirmedOKRs } = get()
        if (confirmedOKRs.length > 3) {
          set({
            confirmedOKRs: confirmedOKRs.filter((_, i) => i !== index),
          })
        }
      },

      reset: () => set(initialState),

      resetCurrentAnswers: () =>
        set({
          objectiveAnswers: { mostImportantThing: '', whyImportant: '' },
          keyResultAnswers: { keyActions: '', successCriteria: '' },
          generatedObjective: '',
          generatedKeyResults: [],
        }),
    }),
    {
      name: 'okr-creation-storage',
    }
  )
)
