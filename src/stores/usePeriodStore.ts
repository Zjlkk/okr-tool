/**
 * @file Period Store
 * @description Manages selected OKR period across the app
 */

import { create } from 'zustand'
import { getCurrentPeriod } from '@/lib/utils'

interface PeriodState {
  selectedPeriod: string
  setSelectedPeriod: (period: string) => void
}

export const usePeriodStore = create<PeriodState>((set) => ({
  selectedPeriod: getCurrentPeriod(),
  setSelectedPeriod: (period) => set({ selectedPeriod: period }),
}))
