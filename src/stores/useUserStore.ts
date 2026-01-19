/**
 * @file User Store
 * @description Manages user authentication and profile state
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'LEADER' | 'MEMBER'

interface User {
  id: string
  name: string
  email: string
  image: string | null
  role: UserRole
  departmentId: string
  departmentName: string
}

interface UserState {
  user: User | null
  isLoggedIn: boolean
  isOnboarded: boolean
  setUser: (user: User) => void
  setRole: (role: UserRole) => void
  setDepartment: (departmentId: string, departmentName: string) => void
  completeOnboarding: () => void
  login: (name: string, email: string) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isOnboarded: false,

      setUser: (user) => set({ user }),

      setRole: (role) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, role } })
        }
      },

      setDepartment: (departmentId, departmentName) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, departmentId, departmentName } })
        }
      },

      completeOnboarding: () => set({ isOnboarded: true }),

      login: (name, email) => {
        set({
          user: {
            id: `user-${Date.now()}`,
            name,
            email,
            image: null,
            role: 'MEMBER',
            departmentId: '',
            departmentName: '',
          },
          isLoggedIn: true,
        })
      },

      logout: () => set({
        user: null,
        isLoggedIn: false,
        isOnboarded: false,
      }),
    }),
    {
      name: 'okr-user',
    }
  )
)
