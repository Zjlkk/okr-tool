/**
 * @file Type Definitions
 * @description Core TypeScript types for OKR Tool
 */

// User roles
export type UserRole = 'LEADER' | 'MEMBER'

// OKR status
export type OKRStatus = 'DRAFT' | 'SUBMITTED'

// Reminder status
export type ReminderStatus = 'PENDING' | 'DONE'

// User
export interface User {
  id: string
  email: string
  name: string
  image?: string | null
  role?: UserRole | null
  departmentId?: string | null
  createdAt: Date
  updatedAt: Date
}

// Department
export interface Department {
  id: string
  name: string
  leaderId?: string | null
  createdAt: Date
  updatedAt: Date
}

// Department OKR (bi-monthly goals set by leader)
export interface DepartmentOKR {
  id: string
  departmentId: string
  period: string // e.g., "2026-01/02"
  objectives: string
  createdAt: Date
  updatedAt: Date
}

// Key Result
export interface KeyResult {
  id: string
  content: string
  progress?: number // 0-100
}

// Personal OKR
export interface PersonalOKR {
  id: string
  userId: string
  period: string
  objective: string
  keyResults: KeyResult[]
  status: OKRStatus
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
}

// Draft (auto-save during OKR creation)
export interface Draft {
  id: string
  userId: string
  period: string
  currentStep: string
  answers: Record<string, string>
  confirmedOKRs: Array<{
    objective: string
    keyResults: KeyResult[]
  }>
  createdAt: Date
  updatedAt: Date
}

// Reminder (member reminding leader)
export interface Reminder {
  id: string
  fromUserId: string
  toUserId: string
  departmentId: string
  period: string
  status: ReminderStatus
  createdAt: Date
}

// Comment (P1 feature)
export interface Comment {
  id: string
  okrId: string
  userId: string
  content: string
  createdAt: Date
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// OKR Creation flow types
export interface OKRCreationStep {
  phase: 'objective' | 'keyResults'
  questionIndex: number
  objectiveIndex: number
}

export interface OKRCreationState {
  departmentGoal: string
  currentStep: OKRCreationStep
  answers: Record<string, string>
  confirmedOKRs: Array<{
    objective: string
    keyResults: KeyResult[]
  }>
  isManualMode: boolean
}

// AI Generation types
export interface AIGenerationRequest {
  type: 'objective' | 'keyResults'
  answers: Record<string, string>
  departmentGoal: string
  existingObjective?: string // for KR generation
}

export interface AIGenerationResponse {
  success: boolean
  result?: string | string[] // single O or array of KRs
  feedback?: string // if answer is too vague
  error?: string
}
