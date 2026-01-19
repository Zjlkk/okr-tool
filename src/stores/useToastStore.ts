/**
 * @file Toast Store
 * @description Zustand store for toast notifications
 */

import { create } from 'zustand'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (type: ToastType, message: string, duration?: number) => void
  removeToast: (id: string) => void
  success: (message: string) => void
  error: (message: string) => void
  warning: (message: string) => void
  info: (message: string) => void
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  addToast: (type, message, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9)
    set((state) => ({
      toasts: [...state.toasts, { id, type, message, duration }],
    }))
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  },

  success: (message) => get().addToast('success', message),
  error: (message) => get().addToast('error', message),
  warning: (message) => get().addToast('warning', message, 0), // No auto-dismiss
  info: (message) => get().addToast('info', message),
}))
