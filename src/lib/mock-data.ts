/**
 * @file Mock Data
 * @description Mock data for frontend testing without backend
 */

// Types for progress tracking
export type MetricType = 'percentage' | 'number' | 'currency' | 'boolean'
export type Confidence = 'on_track' | 'at_risk' | 'off_track'

export interface Metric {
  type: MetricType
  baseline: number
  target: number
  current: number
  unit?: string
}

export interface KeyResultWithMetric {
  id: string
  content: string
  metric: Metric
  progress: number  // Calculated: (current - baseline) / (target - baseline) * 100
  confidence: Confidence
}

export interface WeeklyCheckIn {
  id: string
  weekNumber: number
  date: string
  krProgress: { krId: string; value: number; progress: number }[]
  overallProgress: number
  confidence: Confidence
  notes?: string
}

export interface OKRWithProgress {
  id: string
  objective: string
  keyResults: KeyResultWithMetric[]
  status: 'DRAFT' | 'SUBMITTED'
  checkIns: WeeklyCheckIn[]
}

// Helper to calculate progress
export function calculateProgress(baseline: number, target: number, current: number): number {
  if (target === baseline) return current >= target ? 100 : 0
  const progress = ((current - baseline) / (target - baseline)) * 100
  return Math.max(0, Math.min(100, Math.round(progress)))
}

export const mockUser = {
  id: 'demo-user-1',
  name: 'Demo User',
  email: 'demo@company.com',
  image: null,
  role: 'MEMBER' as 'LEADER' | 'MEMBER',
  departmentId: 'product',
}

export const mockDepartments = [
  { id: 'ceo', name: 'CEO', leaderId: 'leader-0', leaderName: 'Alex Thompson' },
  { id: 'product', name: 'Product', leaderId: 'leader-1', leaderName: 'Sarah Chen' },
  { id: 'design', name: 'Design', leaderId: 'leader-2', leaderName: 'Mike Johnson' },
  { id: 'engineering', name: 'Engineering', leaderId: 'leader-3', leaderName: 'David Kim' },
  { id: 'gtm', name: 'GTM', leaderId: 'leader-4', leaderName: 'Emily Wang' },
  { id: 'operations', name: 'Operations', leaderId: 'leader-5', leaderName: 'James Liu' },
]

export const mockDepartmentGoal = 'Increase user activation rate by 30% and reduce churn by 15% through improved onboarding experience and proactive engagement strategies.'

// Current week in the bi-monthly period (1-8)
export const mockCurrentWeek = 5

// Leader OKRs for each department with metrics
export const mockLeaderOKRs: Record<string, OKRWithProgress[]> = {
  ceo: [
    {
      id: 'leader-okr-ceo-1',
      objective: 'Drive company-wide growth and market leadership',
      keyResults: [
        {
          id: 'lkr-c-1-1',
          content: 'Increase ARR from $5M to $10M',
          metric: { type: 'currency', baseline: 5000000, target: 10000000, current: 7200000, unit: '$' },
          progress: 44,
          confidence: 'on_track'
        },
        {
          id: 'lkr-c-1-2',
          content: 'Expand to 3 new international markets',
          metric: { type: 'number', baseline: 0, target: 3, current: 2, unit: 'markets' },
          progress: 67,
          confidence: 'on_track'
        },
        {
          id: 'lkr-c-1-3',
          content: 'Achieve Series B funding of $30M+',
          metric: { type: 'currency', baseline: 0, target: 30000000, current: 0, unit: '$' },
          progress: 0,
          confidence: 'at_risk'
        },
        {
          id: 'lkr-c-1-4',
          content: 'Grow team from 50 to 100 employees',
          metric: { type: 'number', baseline: 50, target: 100, current: 72, unit: 'people' },
          progress: 44,
          confidence: 'on_track'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-c-1-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-c-1-1', value: 5200000, progress: 4 }, { krId: 'lkr-c-1-2', value: 0, progress: 0 }, { krId: 'lkr-c-1-3', value: 0, progress: 0 }, { krId: 'lkr-c-1-4', value: 52, progress: 4 }], overallProgress: 2, confidence: 'on_track' },
        { id: 'ci-c-1-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-c-1-1', value: 5500000, progress: 10 }, { krId: 'lkr-c-1-2', value: 1, progress: 33 }, { krId: 'lkr-c-1-3', value: 0, progress: 0 }, { krId: 'lkr-c-1-4', value: 58, progress: 16 }], overallProgress: 15, confidence: 'on_track' },
        { id: 'ci-c-1-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-c-1-1', value: 6000000, progress: 20 }, { krId: 'lkr-c-1-2', value: 1, progress: 33 }, { krId: 'lkr-c-1-3', value: 0, progress: 0 }, { krId: 'lkr-c-1-4', value: 63, progress: 26 }], overallProgress: 20, confidence: 'on_track' },
        { id: 'ci-c-1-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-c-1-1', value: 6500000, progress: 30 }, { krId: 'lkr-c-1-2', value: 2, progress: 67 }, { krId: 'lkr-c-1-3', value: 0, progress: 0 }, { krId: 'lkr-c-1-4', value: 68, progress: 36 }], overallProgress: 33, confidence: 'on_track' },
        { id: 'ci-c-1-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-c-1-1', value: 7200000, progress: 44 }, { krId: 'lkr-c-1-2', value: 2, progress: 67 }, { krId: 'lkr-c-1-3', value: 0, progress: 0 }, { krId: 'lkr-c-1-4', value: 72, progress: 44 }], overallProgress: 39, confidence: 'on_track' },
      ],
    },
    {
      id: 'leader-okr-ceo-2',
      objective: 'Build a world-class leadership team and company culture',
      keyResults: [
        {
          id: 'lkr-c-2-1',
          content: 'Hire 3 senior executives (CTO, CFO, CMO)',
          metric: { type: 'number', baseline: 0, target: 3, current: 1, unit: 'hires' },
          progress: 33,
          confidence: 'at_risk'
        },
        {
          id: 'lkr-c-2-2',
          content: 'Achieve employee NPS of 70+',
          metric: { type: 'number', baseline: 45, target: 70, current: 62, unit: 'NPS' },
          progress: 68,
          confidence: 'on_track'
        },
        {
          id: 'lkr-c-2-3',
          content: 'Maintain voluntary turnover below 10%',
          metric: { type: 'percentage', baseline: 15, target: 10, current: 11, unit: '%' },
          progress: 80,
          confidence: 'on_track'
        },
        {
          id: 'lkr-c-2-4',
          content: 'Complete leadership development program for all managers',
          metric: { type: 'percentage', baseline: 0, target: 100, current: 60, unit: '%' },
          progress: 60,
          confidence: 'on_track'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-c-2-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-c-2-1', value: 0, progress: 0 }, { krId: 'lkr-c-2-2', value: 48, progress: 12 }, { krId: 'lkr-c-2-3', value: 14, progress: 20 }, { krId: 'lkr-c-2-4', value: 10, progress: 10 }], overallProgress: 10, confidence: 'on_track' },
        { id: 'ci-c-2-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-c-2-1', value: 0, progress: 0 }, { krId: 'lkr-c-2-2', value: 52, progress: 28 }, { krId: 'lkr-c-2-3', value: 13, progress: 40 }, { krId: 'lkr-c-2-4', value: 25, progress: 25 }], overallProgress: 23, confidence: 'on_track' },
        { id: 'ci-c-2-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-c-2-1', value: 0, progress: 0 }, { krId: 'lkr-c-2-2', value: 55, progress: 40 }, { krId: 'lkr-c-2-3', value: 12, progress: 60 }, { krId: 'lkr-c-2-4', value: 40, progress: 40 }], overallProgress: 35, confidence: 'on_track' },
        { id: 'ci-c-2-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-c-2-1', value: 1, progress: 33 }, { krId: 'lkr-c-2-2', value: 58, progress: 52 }, { krId: 'lkr-c-2-3', value: 11, progress: 80 }, { krId: 'lkr-c-2-4', value: 50, progress: 50 }], overallProgress: 54, confidence: 'on_track' },
        { id: 'ci-c-2-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-c-2-1', value: 1, progress: 33 }, { krId: 'lkr-c-2-2', value: 62, progress: 68 }, { krId: 'lkr-c-2-3', value: 11, progress: 80 }, { krId: 'lkr-c-2-4', value: 60, progress: 60 }], overallProgress: 60, confidence: 'on_track' },
      ],
    },
    {
      id: 'leader-okr-ceo-3',
      objective: 'Establish strategic partnerships and ecosystem',
      keyResults: [
        {
          id: 'lkr-c-3-1',
          content: 'Close 5 strategic partnership deals',
          metric: { type: 'number', baseline: 0, target: 5, current: 3, unit: 'deals' },
          progress: 60,
          confidence: 'on_track'
        },
        {
          id: 'lkr-c-3-2',
          content: 'Launch partner program with 20+ certified partners',
          metric: { type: 'number', baseline: 0, target: 20, current: 12, unit: 'partners' },
          progress: 60,
          confidence: 'on_track'
        },
        {
          id: 'lkr-c-3-3',
          content: 'Generate 25% of revenue through partner channel',
          metric: { type: 'percentage', baseline: 5, target: 25, current: 15, unit: '%' },
          progress: 50,
          confidence: 'at_risk'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-c-3-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-c-3-1', value: 0, progress: 0 }, { krId: 'lkr-c-3-2', value: 2, progress: 10 }, { krId: 'lkr-c-3-3', value: 6, progress: 5 }], overallProgress: 5, confidence: 'on_track' },
        { id: 'ci-c-3-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-c-3-1', value: 1, progress: 20 }, { krId: 'lkr-c-3-2', value: 5, progress: 25 }, { krId: 'lkr-c-3-3', value: 8, progress: 15 }], overallProgress: 20, confidence: 'on_track' },
        { id: 'ci-c-3-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-c-3-1', value: 2, progress: 40 }, { krId: 'lkr-c-3-2', value: 8, progress: 40 }, { krId: 'lkr-c-3-3', value: 10, progress: 25 }], overallProgress: 35, confidence: 'on_track' },
        { id: 'ci-c-3-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-c-3-1', value: 2, progress: 40 }, { krId: 'lkr-c-3-2', value: 10, progress: 50 }, { krId: 'lkr-c-3-3', value: 12, progress: 35 }], overallProgress: 42, confidence: 'on_track' },
        { id: 'ci-c-3-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-c-3-1', value: 3, progress: 60 }, { krId: 'lkr-c-3-2', value: 12, progress: 60 }, { krId: 'lkr-c-3-3', value: 15, progress: 50 }], overallProgress: 57, confidence: 'at_risk' },
      ],
    },
  ],
  product: [
    {
      id: 'leader-okr-product-1',
      objective: 'Drive product-led growth through improved user activation',
      keyResults: [
        {
          id: 'lkr-p-1-1',
          content: 'Increase Day-7 activation rate from 40% to 60%',
          metric: { type: 'percentage', baseline: 40, target: 60, current: 52, unit: '%' },
          progress: 60,
          confidence: 'on_track'
        },
        {
          id: 'lkr-p-1-2',
          content: 'Reduce onboarding drop-off rate by 50%',
          metric: { type: 'percentage', baseline: 100, target: 50, current: 65, unit: '%' },
          progress: 70,
          confidence: 'on_track'
        },
        {
          id: 'lkr-p-1-3',
          content: 'Achieve product NPS score of 50+',
          metric: { type: 'number', baseline: 30, target: 50, current: 42, unit: 'NPS' },
          progress: 60,
          confidence: 'on_track'
        },
        {
          id: 'lkr-p-1-4',
          content: 'Increase free-to-paid conversion rate from 5% to 10%',
          metric: { type: 'percentage', baseline: 5, target: 10, current: 7.5, unit: '%' },
          progress: 50,
          confidence: 'at_risk'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-p-1-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-p-1-1', value: 41, progress: 5 }, { krId: 'lkr-p-1-2', value: 95, progress: 10 }, { krId: 'lkr-p-1-3', value: 32, progress: 10 }, { krId: 'lkr-p-1-4', value: 5.2, progress: 4 }], overallProgress: 7, confidence: 'on_track' },
        { id: 'ci-p-1-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-p-1-1', value: 44, progress: 20 }, { krId: 'lkr-p-1-2', value: 85, progress: 30 }, { krId: 'lkr-p-1-3', value: 35, progress: 25 }, { krId: 'lkr-p-1-4', value: 5.8, progress: 16 }], overallProgress: 23, confidence: 'on_track' },
        { id: 'ci-p-1-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-p-1-1', value: 47, progress: 35 }, { krId: 'lkr-p-1-2', value: 78, progress: 44 }, { krId: 'lkr-p-1-3', value: 38, progress: 40 }, { krId: 'lkr-p-1-4', value: 6.2, progress: 24 }], overallProgress: 36, confidence: 'on_track' },
        { id: 'ci-p-1-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-p-1-1', value: 50, progress: 50 }, { krId: 'lkr-p-1-2', value: 70, progress: 60 }, { krId: 'lkr-p-1-3', value: 40, progress: 50 }, { krId: 'lkr-p-1-4', value: 6.8, progress: 36 }], overallProgress: 49, confidence: 'on_track' },
        { id: 'ci-p-1-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-p-1-1', value: 52, progress: 60 }, { krId: 'lkr-p-1-2', value: 65, progress: 70 }, { krId: 'lkr-p-1-3', value: 42, progress: 60 }, { krId: 'lkr-p-1-4', value: 7.5, progress: 50 }], overallProgress: 60, confidence: 'on_track' },
      ],
    },
    {
      id: 'leader-okr-product-2',
      objective: 'Launch enterprise-grade features to expand market',
      keyResults: [
        {
          id: 'lkr-p-2-1',
          content: 'Ship SSO and SAML authentication',
          metric: { type: 'percentage', baseline: 0, target: 100, current: 100, unit: '%' },
          progress: 100,
          confidence: 'on_track'
        },
        {
          id: 'lkr-p-2-2',
          content: 'Launch role-based access control (RBAC)',
          metric: { type: 'percentage', baseline: 0, target: 100, current: 80, unit: '%' },
          progress: 80,
          confidence: 'on_track'
        },
        {
          id: 'lkr-p-2-3',
          content: 'Achieve SOC 2 Type II compliance',
          metric: { type: 'percentage', baseline: 0, target: 100, current: 60, unit: '%' },
          progress: 60,
          confidence: 'at_risk'
        },
        {
          id: 'lkr-p-2-4',
          content: 'Onboard 10 enterprise customers to new features',
          metric: { type: 'number', baseline: 0, target: 10, current: 6, unit: 'customers' },
          progress: 60,
          confidence: 'on_track'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-p-2-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-p-2-1', value: 20, progress: 20 }, { krId: 'lkr-p-2-2', value: 10, progress: 10 }, { krId: 'lkr-p-2-3', value: 10, progress: 10 }, { krId: 'lkr-p-2-4', value: 0, progress: 0 }], overallProgress: 10, confidence: 'on_track' },
        { id: 'ci-p-2-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-p-2-1', value: 45, progress: 45 }, { krId: 'lkr-p-2-2', value: 25, progress: 25 }, { krId: 'lkr-p-2-3', value: 20, progress: 20 }, { krId: 'lkr-p-2-4', value: 1, progress: 10 }], overallProgress: 25, confidence: 'on_track' },
        { id: 'ci-p-2-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-p-2-1', value: 70, progress: 70 }, { krId: 'lkr-p-2-2', value: 45, progress: 45 }, { krId: 'lkr-p-2-3', value: 35, progress: 35 }, { krId: 'lkr-p-2-4', value: 2, progress: 20 }], overallProgress: 43, confidence: 'on_track' },
        { id: 'ci-p-2-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-p-2-1', value: 90, progress: 90 }, { krId: 'lkr-p-2-2', value: 65, progress: 65 }, { krId: 'lkr-p-2-3', value: 50, progress: 50 }, { krId: 'lkr-p-2-4', value: 4, progress: 40 }], overallProgress: 61, confidence: 'on_track' },
        { id: 'ci-p-2-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-p-2-1', value: 100, progress: 100 }, { krId: 'lkr-p-2-2', value: 80, progress: 80 }, { krId: 'lkr-p-2-3', value: 60, progress: 60 }, { krId: 'lkr-p-2-4', value: 6, progress: 60 }], overallProgress: 75, confidence: 'on_track' },
      ],
    },
    {
      id: 'leader-okr-product-3',
      objective: 'Build data-driven product decision framework',
      keyResults: [
        {
          id: 'lkr-p-3-1',
          content: 'Implement tracking for 100% of key user actions',
          metric: { type: 'percentage', baseline: 40, target: 100, current: 75, unit: '%' },
          progress: 58,
          confidence: 'on_track'
        },
        {
          id: 'lkr-p-3-2',
          content: 'Create weekly product metrics dashboard',
          metric: { type: 'percentage', baseline: 0, target: 100, current: 100, unit: '%' },
          progress: 100,
          confidence: 'on_track'
        },
        {
          id: 'lkr-p-3-3',
          content: 'Run 10 A/B tests with statistically significant results',
          metric: { type: 'number', baseline: 0, target: 10, current: 4, unit: 'tests' },
          progress: 40,
          confidence: 'at_risk'
        },
      ],
      status: 'DRAFT',
      checkIns: [
        { id: 'ci-p-3-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-p-3-1', value: 45, progress: 8 }, { krId: 'lkr-p-3-2', value: 20, progress: 20 }, { krId: 'lkr-p-3-3', value: 0, progress: 0 }], overallProgress: 9, confidence: 'on_track' },
        { id: 'ci-p-3-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-p-3-1', value: 52, progress: 20 }, { krId: 'lkr-p-3-2', value: 50, progress: 50 }, { krId: 'lkr-p-3-3', value: 1, progress: 10 }], overallProgress: 27, confidence: 'on_track' },
        { id: 'ci-p-3-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-p-3-1', value: 60, progress: 33 }, { krId: 'lkr-p-3-2', value: 80, progress: 80 }, { krId: 'lkr-p-3-3', value: 2, progress: 20 }], overallProgress: 44, confidence: 'on_track' },
        { id: 'ci-p-3-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-p-3-1', value: 68, progress: 47 }, { krId: 'lkr-p-3-2', value: 100, progress: 100 }, { krId: 'lkr-p-3-3', value: 3, progress: 30 }], overallProgress: 59, confidence: 'on_track' },
        { id: 'ci-p-3-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-p-3-1', value: 75, progress: 58 }, { krId: 'lkr-p-3-2', value: 100, progress: 100 }, { krId: 'lkr-p-3-3', value: 4, progress: 40 }], overallProgress: 66, confidence: 'at_risk' },
      ],
    },
  ],
  design: [
    {
      id: 'leader-okr-design-1',
      objective: 'Establish a world-class design system and brand identity',
      keyResults: [
        {
          id: 'lkr-d-1-1',
          content: 'Complete design system documentation with 100+ components',
          metric: { type: 'number', baseline: 20, target: 100, current: 72, unit: 'components' },
          progress: 65,
          confidence: 'on_track'
        },
        {
          id: 'lkr-d-1-2',
          content: 'Reduce design-to-development handoff time by 40%',
          metric: { type: 'percentage', baseline: 100, target: 60, current: 75, unit: '%' },
          progress: 63,
          confidence: 'on_track'
        },
        {
          id: 'lkr-d-1-3',
          content: 'Achieve 90% design consistency score across all products',
          metric: { type: 'percentage', baseline: 60, target: 90, current: 78, unit: '%' },
          progress: 60,
          confidence: 'on_track'
        },
        {
          id: 'lkr-d-1-4',
          content: 'Launch Figma component library with 100% adoption',
          metric: { type: 'percentage', baseline: 30, target: 100, current: 85, unit: '%' },
          progress: 79,
          confidence: 'on_track'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-d-1-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-d-1-1', value: 28, progress: 10 }, { krId: 'lkr-d-1-2', value: 95, progress: 13 }, { krId: 'lkr-d-1-3', value: 63, progress: 10 }, { krId: 'lkr-d-1-4', value: 38, progress: 11 }], overallProgress: 11, confidence: 'on_track' },
        { id: 'ci-d-1-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-d-1-1', value: 40, progress: 25 }, { krId: 'lkr-d-1-2', value: 90, progress: 25 }, { krId: 'lkr-d-1-3', value: 67, progress: 23 }, { krId: 'lkr-d-1-4', value: 50, progress: 29 }], overallProgress: 25, confidence: 'on_track' },
        { id: 'ci-d-1-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-d-1-1', value: 52, progress: 40 }, { krId: 'lkr-d-1-2', value: 85, progress: 38 }, { krId: 'lkr-d-1-3', value: 71, progress: 37 }, { krId: 'lkr-d-1-4', value: 62, progress: 46 }], overallProgress: 40, confidence: 'on_track' },
        { id: 'ci-d-1-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-d-1-1', value: 62, progress: 53 }, { krId: 'lkr-d-1-2', value: 80, progress: 50 }, { krId: 'lkr-d-1-3', value: 75, progress: 50 }, { krId: 'lkr-d-1-4', value: 75, progress: 64 }], overallProgress: 54, confidence: 'on_track' },
        { id: 'ci-d-1-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-d-1-1', value: 72, progress: 65 }, { krId: 'lkr-d-1-2', value: 75, progress: 63 }, { krId: 'lkr-d-1-3', value: 78, progress: 60 }, { krId: 'lkr-d-1-4', value: 85, progress: 79 }], overallProgress: 67, confidence: 'on_track' },
      ],
    },
    {
      id: 'leader-okr-design-2',
      objective: 'Improve user experience through research-driven design',
      keyResults: [
        {
          id: 'lkr-d-2-1',
          content: 'Conduct 30+ user interviews per quarter',
          metric: { type: 'number', baseline: 0, target: 30, current: 18, unit: 'interviews' },
          progress: 60,
          confidence: 'on_track'
        },
        {
          id: 'lkr-d-2-2',
          content: 'Increase task completion rate from 70% to 90%',
          metric: { type: 'percentage', baseline: 70, target: 90, current: 82, unit: '%' },
          progress: 60,
          confidence: 'on_track'
        },
        {
          id: 'lkr-d-2-3',
          content: 'Reduce user error rate by 60%',
          metric: { type: 'percentage', baseline: 100, target: 40, current: 55, unit: '%' },
          progress: 75,
          confidence: 'on_track'
        },
        {
          id: 'lkr-d-2-4',
          content: 'Achieve SUS (System Usability Scale) score of 80+',
          metric: { type: 'number', baseline: 65, target: 80, current: 74, unit: 'SUS' },
          progress: 60,
          confidence: 'on_track'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-d-2-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-d-2-1', value: 3, progress: 10 }, { krId: 'lkr-d-2-2', value: 72, progress: 10 }, { krId: 'lkr-d-2-3', value: 92, progress: 13 }, { krId: 'lkr-d-2-4', value: 67, progress: 13 }], overallProgress: 12, confidence: 'on_track' },
        { id: 'ci-d-2-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-d-2-1', value: 7, progress: 23 }, { krId: 'lkr-d-2-2', value: 75, progress: 25 }, { krId: 'lkr-d-2-3', value: 82, progress: 30 }, { krId: 'lkr-d-2-4', value: 69, progress: 27 }], overallProgress: 26, confidence: 'on_track' },
        { id: 'ci-d-2-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-d-2-1', value: 11, progress: 37 }, { krId: 'lkr-d-2-2', value: 78, progress: 40 }, { krId: 'lkr-d-2-3', value: 72, progress: 47 }, { krId: 'lkr-d-2-4', value: 71, progress: 40 }], overallProgress: 41, confidence: 'on_track' },
        { id: 'ci-d-2-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-d-2-1', value: 15, progress: 50 }, { krId: 'lkr-d-2-2', value: 80, progress: 50 }, { krId: 'lkr-d-2-3', value: 65, progress: 58 }, { krId: 'lkr-d-2-4', value: 72, progress: 47 }], overallProgress: 51, confidence: 'on_track' },
        { id: 'ci-d-2-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-d-2-1', value: 18, progress: 60 }, { krId: 'lkr-d-2-2', value: 82, progress: 60 }, { krId: 'lkr-d-2-3', value: 55, progress: 75 }, { krId: 'lkr-d-2-4', value: 74, progress: 60 }], overallProgress: 64, confidence: 'on_track' },
      ],
    },
    {
      id: 'leader-okr-design-3',
      objective: 'Scale design team and processes',
      keyResults: [
        {
          id: 'lkr-d-3-1',
          content: 'Hire 3 senior designers across UX, UI, and motion',
          metric: { type: 'number', baseline: 0, target: 3, current: 2, unit: 'hires' },
          progress: 67,
          confidence: 'on_track'
        },
        {
          id: 'lkr-d-3-2',
          content: 'Implement design critique process with weekly reviews',
          metric: { type: 'percentage', baseline: 0, target: 100, current: 100, unit: '%' },
          progress: 100,
          confidence: 'on_track'
        },
        {
          id: 'lkr-d-3-3',
          content: 'Reduce design cycle time from 2 weeks to 1 week',
          metric: { type: 'number', baseline: 14, target: 7, current: 9, unit: 'days' },
          progress: 71,
          confidence: 'on_track'
        },
      ],
      status: 'DRAFT',
      checkIns: [
        { id: 'ci-d-3-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-d-3-1', value: 0, progress: 0 }, { krId: 'lkr-d-3-2', value: 20, progress: 20 }, { krId: 'lkr-d-3-3', value: 13, progress: 14 }], overallProgress: 11, confidence: 'on_track' },
        { id: 'ci-d-3-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-d-3-1', value: 0, progress: 0 }, { krId: 'lkr-d-3-2', value: 50, progress: 50 }, { krId: 'lkr-d-3-3', value: 12, progress: 29 }], overallProgress: 26, confidence: 'on_track' },
        { id: 'ci-d-3-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-d-3-1', value: 1, progress: 33 }, { krId: 'lkr-d-3-2', value: 80, progress: 80 }, { krId: 'lkr-d-3-3', value: 11, progress: 43 }], overallProgress: 52, confidence: 'on_track' },
        { id: 'ci-d-3-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-d-3-1', value: 1, progress: 33 }, { krId: 'lkr-d-3-2', value: 100, progress: 100 }, { krId: 'lkr-d-3-3', value: 10, progress: 57 }], overallProgress: 63, confidence: 'on_track' },
        { id: 'ci-d-3-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-d-3-1', value: 2, progress: 67 }, { krId: 'lkr-d-3-2', value: 100, progress: 100 }, { krId: 'lkr-d-3-3', value: 9, progress: 71 }], overallProgress: 79, confidence: 'on_track' },
      ],
    },
  ],
  engineering: [
    {
      id: 'leader-okr-eng-1',
      objective: 'Build a scalable and reliable technical infrastructure',
      keyResults: [
        {
          id: 'lkr-e-1-1',
          content: 'Achieve 99.9% system uptime',
          metric: { type: 'percentage', baseline: 99.0, target: 99.9, current: 99.7, unit: '%' },
          progress: 78,
          confidence: 'on_track'
        },
        {
          id: 'lkr-e-1-2',
          content: 'Reduce average API response time to under 100ms',
          metric: { type: 'number', baseline: 250, target: 100, current: 130, unit: 'ms' },
          progress: 80,
          confidence: 'on_track'
        },
        {
          id: 'lkr-e-1-3',
          content: 'Scale infrastructure to handle 10x current load',
          metric: { type: 'number', baseline: 1, target: 10, current: 6, unit: 'x' },
          progress: 56,
          confidence: 'on_track'
        },
        {
          id: 'lkr-e-1-4',
          content: 'Implement auto-scaling with zero manual intervention',
          metric: { type: 'percentage', baseline: 0, target: 100, current: 80, unit: '%' },
          progress: 80,
          confidence: 'on_track'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-e-1-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-e-1-1', value: 99.2, progress: 22 }, { krId: 'lkr-e-1-2', value: 230, progress: 13 }, { krId: 'lkr-e-1-3', value: 1.5, progress: 6 }, { krId: 'lkr-e-1-4', value: 15, progress: 15 }], overallProgress: 14, confidence: 'on_track' },
        { id: 'ci-e-1-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-e-1-1', value: 99.4, progress: 44 }, { krId: 'lkr-e-1-2', value: 200, progress: 33 }, { krId: 'lkr-e-1-3', value: 2.5, progress: 17 }, { krId: 'lkr-e-1-4', value: 30, progress: 30 }], overallProgress: 31, confidence: 'on_track' },
        { id: 'ci-e-1-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-e-1-1', value: 99.5, progress: 56 }, { krId: 'lkr-e-1-2', value: 170, progress: 53 }, { krId: 'lkr-e-1-3', value: 3.5, progress: 28 }, { krId: 'lkr-e-1-4', value: 50, progress: 50 }], overallProgress: 47, confidence: 'on_track' },
        { id: 'ci-e-1-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-e-1-1', value: 99.6, progress: 67 }, { krId: 'lkr-e-1-2', value: 150, progress: 67 }, { krId: 'lkr-e-1-3', value: 4.5, progress: 39 }, { krId: 'lkr-e-1-4', value: 65, progress: 65 }], overallProgress: 59, confidence: 'on_track' },
        { id: 'ci-e-1-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-e-1-1', value: 99.7, progress: 78 }, { krId: 'lkr-e-1-2', value: 130, progress: 80 }, { krId: 'lkr-e-1-3', value: 6, progress: 56 }, { krId: 'lkr-e-1-4', value: 80, progress: 80 }], overallProgress: 73, confidence: 'on_track' },
      ],
    },
    {
      id: 'leader-okr-eng-2',
      objective: 'Improve engineering productivity and code quality',
      keyResults: [
        {
          id: 'lkr-e-2-1',
          content: 'Implement CI/CD pipeline with 80% test coverage',
          metric: { type: 'percentage', baseline: 45, target: 80, current: 68, unit: '%' },
          progress: 66,
          confidence: 'on_track'
        },
        {
          id: 'lkr-e-2-2',
          content: 'Reduce deployment time from 30 min to 5 min',
          metric: { type: 'number', baseline: 30, target: 5, current: 12, unit: 'min' },
          progress: 72,
          confidence: 'on_track'
        },
        {
          id: 'lkr-e-2-3',
          content: 'Achieve PR merge time under 24 hours',
          metric: { type: 'number', baseline: 72, target: 24, current: 36, unit: 'hours' },
          progress: 75,
          confidence: 'on_track'
        },
        {
          id: 'lkr-e-2-4',
          content: 'Reduce production bugs by 50%',
          metric: { type: 'percentage', baseline: 100, target: 50, current: 62, unit: '%' },
          progress: 76,
          confidence: 'on_track'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-e-2-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-e-2-1', value: 48, progress: 9 }, { krId: 'lkr-e-2-2', value: 28, progress: 8 }, { krId: 'lkr-e-2-3', value: 68, progress: 8 }, { krId: 'lkr-e-2-4', value: 95, progress: 10 }], overallProgress: 9, confidence: 'on_track' },
        { id: 'ci-e-2-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-e-2-1', value: 52, progress: 20 }, { krId: 'lkr-e-2-2', value: 25, progress: 20 }, { krId: 'lkr-e-2-3', value: 60, progress: 25 }, { krId: 'lkr-e-2-4', value: 88, progress: 24 }], overallProgress: 22, confidence: 'on_track' },
        { id: 'ci-e-2-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-e-2-1', value: 58, progress: 37 }, { krId: 'lkr-e-2-2', value: 20, progress: 40 }, { krId: 'lkr-e-2-3', value: 52, progress: 42 }, { krId: 'lkr-e-2-4', value: 78, progress: 44 }], overallProgress: 41, confidence: 'on_track' },
        { id: 'ci-e-2-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-e-2-1', value: 63, progress: 51 }, { krId: 'lkr-e-2-2', value: 16, progress: 56 }, { krId: 'lkr-e-2-3', value: 44, progress: 58 }, { krId: 'lkr-e-2-4', value: 70, progress: 60 }], overallProgress: 56, confidence: 'on_track' },
        { id: 'ci-e-2-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-e-2-1', value: 68, progress: 66 }, { krId: 'lkr-e-2-2', value: 12, progress: 72 }, { krId: 'lkr-e-2-3', value: 36, progress: 75 }, { krId: 'lkr-e-2-4', value: 62, progress: 76 }], overallProgress: 72, confidence: 'on_track' },
      ],
    },
    {
      id: 'leader-okr-eng-3',
      objective: 'Strengthen security and compliance posture',
      keyResults: [
        {
          id: 'lkr-e-3-1',
          content: 'Complete security audit with zero critical findings',
          metric: { type: 'number', baseline: 5, target: 0, current: 1, unit: 'findings' },
          progress: 80,
          confidence: 'on_track'
        },
        {
          id: 'lkr-e-3-2',
          content: 'Implement end-to-end encryption for all data',
          metric: { type: 'percentage', baseline: 40, target: 100, current: 85, unit: '%' },
          progress: 75,
          confidence: 'on_track'
        },
        {
          id: 'lkr-e-3-3',
          content: 'Achieve GDPR and CCPA compliance',
          metric: { type: 'percentage', baseline: 50, target: 100, current: 90, unit: '%' },
          progress: 80,
          confidence: 'on_track'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-e-3-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-e-3-1', value: 5, progress: 0 }, { krId: 'lkr-e-3-2', value: 45, progress: 8 }, { krId: 'lkr-e-3-3', value: 55, progress: 10 }], overallProgress: 6, confidence: 'on_track' },
        { id: 'ci-e-3-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-e-3-1', value: 4, progress: 20 }, { krId: 'lkr-e-3-2', value: 55, progress: 25 }, { krId: 'lkr-e-3-3', value: 62, progress: 24 }], overallProgress: 23, confidence: 'on_track' },
        { id: 'ci-e-3-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-e-3-1', value: 3, progress: 40 }, { krId: 'lkr-e-3-2', value: 65, progress: 42 }, { krId: 'lkr-e-3-3', value: 72, progress: 44 }], overallProgress: 42, confidence: 'on_track' },
        { id: 'ci-e-3-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-e-3-1', value: 2, progress: 60 }, { krId: 'lkr-e-3-2', value: 75, progress: 58 }, { krId: 'lkr-e-3-3', value: 82, progress: 64 }], overallProgress: 61, confidence: 'on_track' },
        { id: 'ci-e-3-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-e-3-1', value: 1, progress: 80 }, { krId: 'lkr-e-3-2', value: 85, progress: 75 }, { krId: 'lkr-e-3-3', value: 90, progress: 80 }], overallProgress: 78, confidence: 'on_track' },
      ],
    },
  ],
  gtm: [
    {
      id: 'leader-okr-gtm-1',
      objective: 'Accelerate market expansion and revenue growth',
      keyResults: [
        {
          id: 'lkr-g-1-1',
          content: 'Increase MRR by 50% through new customer acquisition',
          metric: { type: 'percentage', baseline: 0, target: 50, current: 32, unit: '%' },
          progress: 64,
          confidence: 'on_track'
        },
        {
          id: 'lkr-g-1-2',
          content: 'Launch in 3 new geographic markets (EU, APAC, LATAM)',
          metric: { type: 'number', baseline: 0, target: 3, current: 2, unit: 'markets' },
          progress: 67,
          confidence: 'on_track'
        },
        {
          id: 'lkr-g-1-3',
          content: 'Achieve 120% net revenue retention',
          metric: { type: 'percentage', baseline: 100, target: 120, current: 112, unit: '%' },
          progress: 60,
          confidence: 'on_track'
        },
        {
          id: 'lkr-g-1-4',
          content: 'Reduce customer acquisition cost (CAC) by 20%',
          metric: { type: 'percentage', baseline: 100, target: 80, current: 88, unit: '%' },
          progress: 60,
          confidence: 'at_risk'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-g-1-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-g-1-1', value: 5, progress: 10 }, { krId: 'lkr-g-1-2', value: 0, progress: 0 }, { krId: 'lkr-g-1-3', value: 102, progress: 10 }, { krId: 'lkr-g-1-4', value: 98, progress: 10 }], overallProgress: 8, confidence: 'on_track' },
        { id: 'ci-g-1-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-g-1-1', value: 12, progress: 24 }, { krId: 'lkr-g-1-2', value: 1, progress: 33 }, { krId: 'lkr-g-1-3', value: 105, progress: 25 }, { krId: 'lkr-g-1-4', value: 95, progress: 25 }], overallProgress: 27, confidence: 'on_track' },
        { id: 'ci-g-1-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-g-1-1', value: 20, progress: 40 }, { krId: 'lkr-g-1-2', value: 1, progress: 33 }, { krId: 'lkr-g-1-3', value: 108, progress: 40 }, { krId: 'lkr-g-1-4', value: 92, progress: 40 }], overallProgress: 38, confidence: 'on_track' },
        { id: 'ci-g-1-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-g-1-1', value: 26, progress: 52 }, { krId: 'lkr-g-1-2', value: 2, progress: 67 }, { krId: 'lkr-g-1-3', value: 110, progress: 50 }, { krId: 'lkr-g-1-4', value: 90, progress: 50 }], overallProgress: 55, confidence: 'on_track' },
        { id: 'ci-g-1-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-g-1-1', value: 32, progress: 64 }, { krId: 'lkr-g-1-2', value: 2, progress: 67 }, { krId: 'lkr-g-1-3', value: 112, progress: 60 }, { krId: 'lkr-g-1-4', value: 88, progress: 60 }], overallProgress: 63, confidence: 'on_track' },
      ],
    },
    {
      id: 'leader-okr-gtm-2',
      objective: 'Build high-performing sales organization',
      keyResults: [
        {
          id: 'lkr-g-2-1',
          content: 'Hire and ramp 10 new account executives',
          metric: { type: 'number', baseline: 0, target: 10, current: 7, unit: 'AEs' },
          progress: 70,
          confidence: 'on_track'
        },
        {
          id: 'lkr-g-2-2',
          content: 'Achieve 80% quota attainment across sales team',
          metric: { type: 'percentage', baseline: 55, target: 80, current: 68, unit: '%' },
          progress: 52,
          confidence: 'at_risk'
        },
        {
          id: 'lkr-g-2-3',
          content: 'Reduce sales cycle from 60 days to 45 days',
          metric: { type: 'number', baseline: 60, target: 45, current: 52, unit: 'days' },
          progress: 53,
          confidence: 'on_track'
        },
        {
          id: 'lkr-g-2-4',
          content: 'Implement sales playbook with 90% adoption',
          metric: { type: 'percentage', baseline: 20, target: 90, current: 75, unit: '%' },
          progress: 79,
          confidence: 'on_track'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-g-2-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-g-2-1', value: 1, progress: 10 }, { krId: 'lkr-g-2-2', value: 58, progress: 12 }, { krId: 'lkr-g-2-3', value: 58, progress: 13 }, { krId: 'lkr-g-2-4', value: 28, progress: 11 }], overallProgress: 12, confidence: 'on_track' },
        { id: 'ci-g-2-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-g-2-1', value: 3, progress: 30 }, { krId: 'lkr-g-2-2', value: 60, progress: 20 }, { krId: 'lkr-g-2-3', value: 56, progress: 27 }, { krId: 'lkr-g-2-4', value: 40, progress: 29 }], overallProgress: 26, confidence: 'on_track' },
        { id: 'ci-g-2-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-g-2-1', value: 5, progress: 50 }, { krId: 'lkr-g-2-2', value: 63, progress: 32 }, { krId: 'lkr-g-2-3', value: 55, progress: 33 }, { krId: 'lkr-g-2-4', value: 55, progress: 50 }], overallProgress: 41, confidence: 'on_track' },
        { id: 'ci-g-2-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-g-2-1', value: 6, progress: 60 }, { krId: 'lkr-g-2-2', value: 65, progress: 40 }, { krId: 'lkr-g-2-3', value: 54, progress: 40 }, { krId: 'lkr-g-2-4', value: 65, progress: 64 }], overallProgress: 51, confidence: 'on_track' },
        { id: 'ci-g-2-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-g-2-1', value: 7, progress: 70 }, { krId: 'lkr-g-2-2', value: 68, progress: 52 }, { krId: 'lkr-g-2-3', value: 52, progress: 53 }, { krId: 'lkr-g-2-4', value: 75, progress: 79 }], overallProgress: 63, confidence: 'on_track' },
      ],
    },
    {
      id: 'leader-okr-gtm-3',
      objective: 'Establish thought leadership and brand awareness',
      keyResults: [
        {
          id: 'lkr-g-3-1',
          content: 'Increase organic website traffic by 100%',
          metric: { type: 'percentage', baseline: 0, target: 100, current: 55, unit: '%' },
          progress: 55,
          confidence: 'at_risk'
        },
        {
          id: 'lkr-g-3-2',
          content: 'Publish 20 thought leadership articles',
          metric: { type: 'number', baseline: 0, target: 20, current: 12, unit: 'articles' },
          progress: 60,
          confidence: 'on_track'
        },
        {
          id: 'lkr-g-3-3',
          content: 'Speak at 10 industry conferences',
          metric: { type: 'number', baseline: 0, target: 10, current: 5, unit: 'conferences' },
          progress: 50,
          confidence: 'at_risk'
        },
      ],
      status: 'DRAFT',
      checkIns: [
        { id: 'ci-g-3-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-g-3-1', value: 8, progress: 8 }, { krId: 'lkr-g-3-2', value: 2, progress: 10 }, { krId: 'lkr-g-3-3', value: 1, progress: 10 }], overallProgress: 9, confidence: 'on_track' },
        { id: 'ci-g-3-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-g-3-1', value: 18, progress: 18 }, { krId: 'lkr-g-3-2', value: 5, progress: 25 }, { krId: 'lkr-g-3-3', value: 2, progress: 20 }], overallProgress: 21, confidence: 'on_track' },
        { id: 'ci-g-3-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-g-3-1', value: 30, progress: 30 }, { krId: 'lkr-g-3-2', value: 7, progress: 35 }, { krId: 'lkr-g-3-3', value: 3, progress: 30 }], overallProgress: 32, confidence: 'on_track' },
        { id: 'ci-g-3-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-g-3-1', value: 42, progress: 42 }, { krId: 'lkr-g-3-2', value: 9, progress: 45 }, { krId: 'lkr-g-3-3', value: 4, progress: 40 }], overallProgress: 42, confidence: 'on_track' },
        { id: 'ci-g-3-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-g-3-1', value: 55, progress: 55 }, { krId: 'lkr-g-3-2', value: 12, progress: 60 }, { krId: 'lkr-g-3-3', value: 5, progress: 50 }], overallProgress: 55, confidence: 'at_risk' },
      ],
    },
  ],
  operations: [
    {
      id: 'leader-okr-ops-1',
      objective: 'Optimize operational efficiency and cost structure',
      keyResults: [
        {
          id: 'lkr-o-1-1',
          content: 'Reduce operational costs by 20%',
          metric: { type: 'percentage', baseline: 100, target: 80, current: 88, unit: '%' },
          progress: 60,
          confidence: 'on_track'
        },
        {
          id: 'lkr-o-1-2',
          content: 'Implement automated workflows for 80% of repetitive tasks',
          metric: { type: 'percentage', baseline: 25, target: 80, current: 58, unit: '%' },
          progress: 60,
          confidence: 'on_track'
        },
        {
          id: 'lkr-o-1-3',
          content: 'Reduce vendor management overhead by 30%',
          metric: { type: 'percentage', baseline: 100, target: 70, current: 82, unit: '%' },
          progress: 60,
          confidence: 'on_track'
        },
        {
          id: 'lkr-o-1-4',
          content: 'Achieve 95% on-time delivery for internal SLAs',
          metric: { type: 'percentage', baseline: 75, target: 95, current: 88, unit: '%' },
          progress: 65,
          confidence: 'on_track'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-o-1-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-o-1-1', value: 98, progress: 10 }, { krId: 'lkr-o-1-2', value: 30, progress: 9 }, { krId: 'lkr-o-1-3', value: 97, progress: 10 }, { krId: 'lkr-o-1-4', value: 77, progress: 10 }], overallProgress: 10, confidence: 'on_track' },
        { id: 'ci-o-1-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-o-1-1', value: 95, progress: 25 }, { krId: 'lkr-o-1-2', value: 38, progress: 24 }, { krId: 'lkr-o-1-3', value: 93, progress: 23 }, { krId: 'lkr-o-1-4', value: 80, progress: 25 }], overallProgress: 24, confidence: 'on_track' },
        { id: 'ci-o-1-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-o-1-1', value: 92, progress: 40 }, { krId: 'lkr-o-1-2', value: 45, progress: 36 }, { krId: 'lkr-o-1-3', value: 88, progress: 40 }, { krId: 'lkr-o-1-4', value: 83, progress: 40 }], overallProgress: 39, confidence: 'on_track' },
        { id: 'ci-o-1-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-o-1-1', value: 90, progress: 50 }, { krId: 'lkr-o-1-2', value: 52, progress: 49 }, { krId: 'lkr-o-1-3', value: 85, progress: 50 }, { krId: 'lkr-o-1-4', value: 85, progress: 50 }], overallProgress: 50, confidence: 'on_track' },
        { id: 'ci-o-1-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-o-1-1', value: 88, progress: 60 }, { krId: 'lkr-o-1-2', value: 58, progress: 60 }, { krId: 'lkr-o-1-3', value: 82, progress: 60 }, { krId: 'lkr-o-1-4', value: 88, progress: 65 }], overallProgress: 61, confidence: 'on_track' },
      ],
    },
    {
      id: 'leader-okr-ops-2',
      objective: 'Build exceptional employee experience',
      keyResults: [
        {
          id: 'lkr-o-2-1',
          content: 'Achieve employee satisfaction score of 4.5/5',
          metric: { type: 'number', baseline: 3.8, target: 4.5, current: 4.2, unit: '/5' },
          progress: 57,
          confidence: 'on_track'
        },
        {
          id: 'lkr-o-2-2',
          content: 'Reduce time-to-hire from 45 days to 30 days',
          metric: { type: 'number', baseline: 45, target: 30, current: 36, unit: 'days' },
          progress: 60,
          confidence: 'on_track'
        },
        {
          id: 'lkr-o-2-3',
          content: 'Implement comprehensive onboarding with 90% satisfaction',
          metric: { type: 'percentage', baseline: 70, target: 90, current: 82, unit: '%' },
          progress: 60,
          confidence: 'on_track'
        },
        {
          id: 'lkr-o-2-4',
          content: 'Launch learning & development program with 80% participation',
          metric: { type: 'percentage', baseline: 30, target: 80, current: 62, unit: '%' },
          progress: 64,
          confidence: 'on_track'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-o-2-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-o-2-1', value: 3.85, progress: 7 }, { krId: 'lkr-o-2-2', value: 44, progress: 7 }, { krId: 'lkr-o-2-3', value: 72, progress: 10 }, { krId: 'lkr-o-2-4', value: 35, progress: 10 }], overallProgress: 8, confidence: 'on_track' },
        { id: 'ci-o-2-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-o-2-1', value: 3.95, progress: 21 }, { krId: 'lkr-o-2-2', value: 42, progress: 20 }, { krId: 'lkr-o-2-3', value: 75, progress: 25 }, { krId: 'lkr-o-2-4', value: 42, progress: 24 }], overallProgress: 23, confidence: 'on_track' },
        { id: 'ci-o-2-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-o-2-1', value: 4.05, progress: 36 }, { krId: 'lkr-o-2-2', value: 40, progress: 33 }, { krId: 'lkr-o-2-3', value: 78, progress: 40 }, { krId: 'lkr-o-2-4', value: 50, progress: 40 }], overallProgress: 37, confidence: 'on_track' },
        { id: 'ci-o-2-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-o-2-1', value: 4.12, progress: 46 }, { krId: 'lkr-o-2-2', value: 38, progress: 47 }, { krId: 'lkr-o-2-3', value: 80, progress: 50 }, { krId: 'lkr-o-2-4', value: 55, progress: 50 }], overallProgress: 48, confidence: 'on_track' },
        { id: 'ci-o-2-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-o-2-1', value: 4.2, progress: 57 }, { krId: 'lkr-o-2-2', value: 36, progress: 60 }, { krId: 'lkr-o-2-3', value: 82, progress: 60 }, { krId: 'lkr-o-2-4', value: 62, progress: 64 }], overallProgress: 60, confidence: 'on_track' },
      ],
    },
    {
      id: 'leader-okr-ops-3',
      objective: 'Strengthen financial planning and reporting',
      keyResults: [
        {
          id: 'lkr-o-3-1',
          content: 'Implement monthly close process within 5 business days',
          metric: { type: 'number', baseline: 12, target: 5, current: 7, unit: 'days' },
          progress: 71,
          confidence: 'on_track'
        },
        {
          id: 'lkr-o-3-2',
          content: 'Achieve budget variance under 5%',
          metric: { type: 'percentage', baseline: 15, target: 5, current: 8, unit: '%' },
          progress: 70,
          confidence: 'on_track'
        },
        {
          id: 'lkr-o-3-3',
          content: 'Launch real-time financial dashboard for leadership',
          metric: { type: 'percentage', baseline: 0, target: 100, current: 85, unit: '%' },
          progress: 85,
          confidence: 'on_track'
        },
      ],
      status: 'SUBMITTED',
      checkIns: [
        { id: 'ci-o-3-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'lkr-o-3-1', value: 11, progress: 14 }, { krId: 'lkr-o-3-2', value: 14, progress: 10 }, { krId: 'lkr-o-3-3', value: 15, progress: 15 }], overallProgress: 13, confidence: 'on_track' },
        { id: 'ci-o-3-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'lkr-o-3-1', value: 10, progress: 29 }, { krId: 'lkr-o-3-2', value: 12, progress: 30 }, { krId: 'lkr-o-3-3', value: 35, progress: 35 }], overallProgress: 31, confidence: 'on_track' },
        { id: 'ci-o-3-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'lkr-o-3-1', value: 9, progress: 43 }, { krId: 'lkr-o-3-2', value: 10, progress: 50 }, { krId: 'lkr-o-3-3', value: 55, progress: 55 }], overallProgress: 49, confidence: 'on_track' },
        { id: 'ci-o-3-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'lkr-o-3-1', value: 8, progress: 57 }, { krId: 'lkr-o-3-2', value: 9, progress: 60 }, { krId: 'lkr-o-3-3', value: 70, progress: 70 }], overallProgress: 62, confidence: 'on_track' },
        { id: 'ci-o-3-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'lkr-o-3-1', value: 7, progress: 71 }, { krId: 'lkr-o-3-2', value: 8, progress: 70 }, { krId: 'lkr-o-3-3', value: 85, progress: 85 }], overallProgress: 75, confidence: 'on_track' },
      ],
    },
  ],
}

// User's OKRs with metrics
export const mockOKRs: OKRWithProgress[] = [
  {
    id: 'okr-1',
    objective: 'Launch new user onboarding flow to improve first-week activation',
    keyResults: [
      {
        id: 'kr-1-1',
        content: 'Increase Day-7 activation rate from 40% to 60%',
        metric: { type: 'percentage', baseline: 40, target: 60, current: 52, unit: '%' },
        progress: 60,
        confidence: 'on_track'
      },
      {
        id: 'kr-1-2',
        content: 'Reduce onboarding drop-off rate by 50%',
        metric: { type: 'percentage', baseline: 100, target: 50, current: 65, unit: '%' },
        progress: 70,
        confidence: 'on_track'
      },
      {
        id: 'kr-1-3',
        content: 'Achieve NPS score of 50+ for new users',
        metric: { type: 'number', baseline: 30, target: 50, current: 42, unit: 'NPS' },
        progress: 60,
        confidence: 'on_track'
      },
    ],
    status: 'SUBMITTED',
    checkIns: [
      { id: 'ci-1-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'kr-1-1', value: 42, progress: 10 }, { krId: 'kr-1-2', value: 92, progress: 16 }, { krId: 'kr-1-3', value: 33, progress: 15 }], overallProgress: 14, confidence: 'on_track' },
      { id: 'ci-1-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'kr-1-1', value: 45, progress: 25 }, { krId: 'kr-1-2', value: 82, progress: 36 }, { krId: 'kr-1-3', value: 36, progress: 30 }], overallProgress: 30, confidence: 'on_track' },
      { id: 'ci-1-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'kr-1-1', value: 48, progress: 40 }, { krId: 'kr-1-2', value: 75, progress: 50 }, { krId: 'kr-1-3', value: 38, progress: 40 }], overallProgress: 43, confidence: 'on_track' },
      { id: 'ci-1-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'kr-1-1', value: 50, progress: 50 }, { krId: 'kr-1-2', value: 70, progress: 60 }, { krId: 'kr-1-3', value: 40, progress: 50 }], overallProgress: 53, confidence: 'on_track' },
      { id: 'ci-1-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'kr-1-1', value: 52, progress: 60 }, { krId: 'kr-1-2', value: 65, progress: 70 }, { krId: 'kr-1-3', value: 42, progress: 60 }], overallProgress: 63, confidence: 'on_track' },
    ],
  },
  {
    id: 'okr-2',
    objective: 'Build data-driven product decision framework',
    keyResults: [
      {
        id: 'kr-2-1',
        content: 'Implement tracking for 100% of key user actions',
        metric: { type: 'percentage', baseline: 40, target: 100, current: 75, unit: '%' },
        progress: 58,
        confidence: 'on_track'
      },
      {
        id: 'kr-2-2',
        content: 'Create weekly product metrics dashboard',
        metric: { type: 'percentage', baseline: 0, target: 100, current: 100, unit: '%' },
        progress: 100,
        confidence: 'on_track'
      },
      {
        id: 'kr-2-3',
        content: 'Run 5 A/B tests with statistically significant results',
        metric: { type: 'number', baseline: 0, target: 5, current: 3, unit: 'tests' },
        progress: 60,
        confidence: 'on_track'
      },
    ],
    status: 'SUBMITTED',
    checkIns: [
      { id: 'ci-2-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'kr-2-1', value: 45, progress: 8 }, { krId: 'kr-2-2', value: 20, progress: 20 }, { krId: 'kr-2-3', value: 0, progress: 0 }], overallProgress: 9, confidence: 'on_track' },
      { id: 'ci-2-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'kr-2-1', value: 52, progress: 20 }, { krId: 'kr-2-2', value: 50, progress: 50 }, { krId: 'kr-2-3', value: 1, progress: 20 }], overallProgress: 30, confidence: 'on_track' },
      { id: 'ci-2-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'kr-2-1', value: 60, progress: 33 }, { krId: 'kr-2-2', value: 80, progress: 80 }, { krId: 'kr-2-3', value: 2, progress: 40 }], overallProgress: 51, confidence: 'on_track' },
      { id: 'ci-2-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'kr-2-1', value: 68, progress: 47 }, { krId: 'kr-2-2', value: 100, progress: 100 }, { krId: 'kr-2-3', value: 2, progress: 40 }], overallProgress: 62, confidence: 'on_track' },
      { id: 'ci-2-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'kr-2-1', value: 75, progress: 58 }, { krId: 'kr-2-2', value: 100, progress: 100 }, { krId: 'kr-2-3', value: 3, progress: 60 }], overallProgress: 73, confidence: 'on_track' },
    ],
  },
  {
    id: 'okr-3',
    objective: 'Strengthen cross-functional collaboration with engineering',
    keyResults: [
      {
        id: 'kr-3-1',
        content: 'Reduce spec-to-launch cycle time by 20%',
        metric: { type: 'percentage', baseline: 100, target: 80, current: 88, unit: '%' },
        progress: 60,
        confidence: 'on_track'
      },
      {
        id: 'kr-3-2',
        content: 'Achieve 90% on-time delivery for sprint commitments',
        metric: { type: 'percentage', baseline: 70, target: 90, current: 82, unit: '%' },
        progress: 60,
        confidence: 'at_risk'
      },
      {
        id: 'kr-3-3',
        content: 'Conduct bi-weekly design reviews with engineering',
        metric: { type: 'number', baseline: 0, target: 8, current: 5, unit: 'reviews' },
        progress: 63,
        confidence: 'on_track'
      },
    ],
    status: 'DRAFT',
    checkIns: [
      { id: 'ci-3-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'kr-3-1', value: 98, progress: 10 }, { krId: 'kr-3-2', value: 72, progress: 10 }, { krId: 'kr-3-3', value: 1, progress: 13 }], overallProgress: 11, confidence: 'on_track' },
      { id: 'ci-3-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'kr-3-1', value: 95, progress: 25 }, { krId: 'kr-3-2', value: 75, progress: 25 }, { krId: 'kr-3-3', value: 2, progress: 25 }], overallProgress: 25, confidence: 'on_track' },
      { id: 'ci-3-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'kr-3-1', value: 92, progress: 40 }, { krId: 'kr-3-2', value: 78, progress: 40 }, { krId: 'kr-3-3', value: 3, progress: 38 }], overallProgress: 39, confidence: 'on_track' },
      { id: 'ci-3-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'kr-3-1', value: 90, progress: 50 }, { krId: 'kr-3-2', value: 80, progress: 50 }, { krId: 'kr-3-3', value: 4, progress: 50 }], overallProgress: 50, confidence: 'on_track' },
      { id: 'ci-3-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'kr-3-1', value: 88, progress: 60 }, { krId: 'kr-3-2', value: 82, progress: 60 }, { krId: 'kr-3-3', value: 5, progress: 63 }], overallProgress: 61, confidence: 'at_risk' },
    ],
  },
]

// Team member OKRs with metrics for each department
export const mockTeamOKRsByDepartment: Record<string, {
  id: string
  userId: string
  userName: string
  userImage: string | null
  okrs: OKRWithProgress[]
}[]> = {
  ceo: [],
  product: [
    {
      id: 'team-member-p-1',
      userId: 'user-p-1',
      userName: 'Alice Chen',
      userImage: null,
      okrs: [
        {
          id: 'team-okr-p-1',
          objective: 'Redesign the dashboard to improve user engagement',
          keyResults: [
            {
              id: 'tkr-p-1-1',
              content: 'Increase daily active usage by 25%',
              metric: { type: 'percentage', baseline: 0, target: 25, current: 18, unit: '%' },
              progress: 72,
              confidence: 'on_track'
            },
            {
              id: 'tkr-p-1-2',
              content: 'Reduce time-to-insight by 40%',
              metric: { type: 'percentage', baseline: 100, target: 60, current: 72, unit: '%' },
              progress: 70,
              confidence: 'on_track'
            },
          ],
          status: 'SUBMITTED',
          checkIns: [
            { id: 'tci-p-1-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'tkr-p-1-1', value: 3, progress: 12 }, { krId: 'tkr-p-1-2', value: 95, progress: 13 }], overallProgress: 12, confidence: 'on_track' },
            { id: 'tci-p-1-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'tkr-p-1-1', value: 7, progress: 28 }, { krId: 'tkr-p-1-2', value: 88, progress: 30 }], overallProgress: 29, confidence: 'on_track' },
            { id: 'tci-p-1-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'tkr-p-1-1', value: 11, progress: 44 }, { krId: 'tkr-p-1-2', value: 82, progress: 45 }], overallProgress: 45, confidence: 'on_track' },
            { id: 'tci-p-1-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'tkr-p-1-1', value: 15, progress: 60 }, { krId: 'tkr-p-1-2', value: 76, progress: 60 }], overallProgress: 60, confidence: 'on_track' },
            { id: 'tci-p-1-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'tkr-p-1-1', value: 18, progress: 72 }, { krId: 'tkr-p-1-2', value: 72, progress: 70 }], overallProgress: 71, confidence: 'on_track' },
          ],
        },
      ],
    },
    {
      id: 'team-member-p-2',
      userId: 'user-p-2',
      userName: 'Bob Wang',
      userImage: null,
      okrs: [
        {
          id: 'team-okr-p-2',
          objective: 'Improve product analytics capabilities',
          keyResults: [
            {
              id: 'tkr-p-2-1',
              content: 'Implement real-time event tracking',
              metric: { type: 'percentage', baseline: 0, target: 100, current: 85, unit: '%' },
              progress: 85,
              confidence: 'on_track'
            },
            {
              id: 'tkr-p-2-2',
              content: 'Create 10 actionable dashboard reports',
              metric: { type: 'number', baseline: 0, target: 10, current: 7, unit: 'reports' },
              progress: 70,
              confidence: 'on_track'
            },
          ],
          status: 'SUBMITTED',
          checkIns: [
            { id: 'tci-p-2-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'tkr-p-2-1', value: 15, progress: 15 }, { krId: 'tkr-p-2-2', value: 1, progress: 10 }], overallProgress: 12, confidence: 'on_track' },
            { id: 'tci-p-2-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'tkr-p-2-1', value: 35, progress: 35 }, { krId: 'tkr-p-2-2', value: 3, progress: 30 }], overallProgress: 32, confidence: 'on_track' },
            { id: 'tci-p-2-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'tkr-p-2-1', value: 55, progress: 55 }, { krId: 'tkr-p-2-2', value: 5, progress: 50 }], overallProgress: 52, confidence: 'on_track' },
            { id: 'tci-p-2-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'tkr-p-2-1', value: 70, progress: 70 }, { krId: 'tkr-p-2-2', value: 6, progress: 60 }], overallProgress: 65, confidence: 'on_track' },
            { id: 'tci-p-2-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'tkr-p-2-1', value: 85, progress: 85 }, { krId: 'tkr-p-2-2', value: 7, progress: 70 }], overallProgress: 77, confidence: 'on_track' },
          ],
        },
      ],
    },
  ],
  design: [
    {
      id: 'team-member-d-1',
      userId: 'user-d-1',
      userName: 'Lisa Park',
      userImage: null,
      okrs: [
        {
          id: 'team-okr-d-1',
          objective: 'Create comprehensive icon and illustration library',
          keyResults: [
            {
              id: 'tkr-d-1-1',
              content: 'Design 200+ custom icons',
              metric: { type: 'number', baseline: 50, target: 200, current: 145, unit: 'icons' },
              progress: 63,
              confidence: 'on_track'
            },
            {
              id: 'tkr-d-1-2',
              content: 'Create 50 branded illustrations',
              metric: { type: 'number', baseline: 10, target: 50, current: 35, unit: 'illustrations' },
              progress: 63,
              confidence: 'on_track'
            },
          ],
          status: 'SUBMITTED',
          checkIns: [
            { id: 'tci-d-1-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'tkr-d-1-1', value: 65, progress: 10 }, { krId: 'tkr-d-1-2', value: 14, progress: 10 }], overallProgress: 10, confidence: 'on_track' },
            { id: 'tci-d-1-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'tkr-d-1-1', value: 85, progress: 23 }, { krId: 'tkr-d-1-2', value: 18, progress: 20 }], overallProgress: 22, confidence: 'on_track' },
            { id: 'tci-d-1-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'tkr-d-1-1', value: 105, progress: 37 }, { krId: 'tkr-d-1-2', value: 24, progress: 35 }], overallProgress: 36, confidence: 'on_track' },
            { id: 'tci-d-1-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'tkr-d-1-1', value: 125, progress: 50 }, { krId: 'tkr-d-1-2', value: 30, progress: 50 }], overallProgress: 50, confidence: 'on_track' },
            { id: 'tci-d-1-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'tkr-d-1-1', value: 145, progress: 63 }, { krId: 'tkr-d-1-2', value: 35, progress: 63 }], overallProgress: 63, confidence: 'on_track' },
          ],
        },
      ],
    },
  ],
  engineering: [
    {
      id: 'team-member-e-1',
      userId: 'user-e-1',
      userName: 'Tom Zhang',
      userImage: null,
      okrs: [
        {
          id: 'team-okr-e-1',
          objective: 'Migrate infrastructure to Kubernetes',
          keyResults: [
            {
              id: 'tkr-e-1-1',
              content: 'Migrate 100% of services to K8s',
              metric: { type: 'percentage', baseline: 20, target: 100, current: 75, unit: '%' },
              progress: 69,
              confidence: 'on_track'
            },
            {
              id: 'tkr-e-1-2',
              content: 'Reduce deployment time by 60%',
              metric: { type: 'percentage', baseline: 100, target: 40, current: 55, unit: '%' },
              progress: 75,
              confidence: 'on_track'
            },
          ],
          status: 'SUBMITTED',
          checkIns: [
            { id: 'tci-e-1-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'tkr-e-1-1', value: 28, progress: 10 }, { krId: 'tkr-e-1-2', value: 92, progress: 13 }], overallProgress: 12, confidence: 'on_track' },
            { id: 'tci-e-1-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'tkr-e-1-1', value: 40, progress: 25 }, { krId: 'tkr-e-1-2', value: 82, progress: 30 }], overallProgress: 27, confidence: 'on_track' },
            { id: 'tci-e-1-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'tkr-e-1-1', value: 52, progress: 40 }, { krId: 'tkr-e-1-2', value: 72, progress: 47 }], overallProgress: 43, confidence: 'on_track' },
            { id: 'tci-e-1-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'tkr-e-1-1', value: 65, progress: 56 }, { krId: 'tkr-e-1-2', value: 62, progress: 63 }], overallProgress: 60, confidence: 'on_track' },
            { id: 'tci-e-1-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'tkr-e-1-1', value: 75, progress: 69 }, { krId: 'tkr-e-1-2', value: 55, progress: 75 }], overallProgress: 72, confidence: 'on_track' },
          ],
        },
      ],
    },
    {
      id: 'team-member-e-2',
      userId: 'user-e-2',
      userName: 'Jenny Li',
      userImage: null,
      okrs: [
        {
          id: 'team-okr-e-2',
          objective: 'Implement comprehensive monitoring system',
          keyResults: [
            {
              id: 'tkr-e-2-1',
              content: 'Set up alerting for all critical paths',
              metric: { type: 'percentage', baseline: 30, target: 100, current: 78, unit: '%' },
              progress: 69,
              confidence: 'on_track'
            },
            {
              id: 'tkr-e-2-2',
              content: 'Achieve MTTR under 15 minutes',
              metric: { type: 'number', baseline: 45, target: 15, current: 22, unit: 'min' },
              progress: 77,
              confidence: 'on_track'
            },
          ],
          status: 'DRAFT',
          checkIns: [
            { id: 'tci-e-2-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'tkr-e-2-1', value: 37, progress: 10 }, { krId: 'tkr-e-2-2', value: 42, progress: 10 }], overallProgress: 10, confidence: 'on_track' },
            { id: 'tci-e-2-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'tkr-e-2-1', value: 48, progress: 26 }, { krId: 'tkr-e-2-2', value: 38, progress: 23 }], overallProgress: 24, confidence: 'on_track' },
            { id: 'tci-e-2-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'tkr-e-2-1', value: 58, progress: 40 }, { krId: 'tkr-e-2-2', value: 32, progress: 43 }], overallProgress: 42, confidence: 'on_track' },
            { id: 'tci-e-2-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'tkr-e-2-1', value: 68, progress: 54 }, { krId: 'tkr-e-2-2', value: 26, progress: 63 }], overallProgress: 59, confidence: 'on_track' },
            { id: 'tci-e-2-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'tkr-e-2-1', value: 78, progress: 69 }, { krId: 'tkr-e-2-2', value: 22, progress: 77 }], overallProgress: 73, confidence: 'on_track' },
          ],
        },
      ],
    },
  ],
  gtm: [
    {
      id: 'team-member-g-1',
      userId: 'user-g-1',
      userName: 'Kevin Wu',
      userImage: null,
      okrs: [
        {
          id: 'team-okr-g-1',
          objective: 'Launch enterprise sales program',
          keyResults: [
            {
              id: 'tkr-g-1-1',
              content: 'Close 10 enterprise deals',
              metric: { type: 'number', baseline: 0, target: 10, current: 6, unit: 'deals' },
              progress: 60,
              confidence: 'on_track'
            },
            {
              id: 'tkr-g-1-2',
              content: 'Build pipeline of $2M ARR',
              metric: { type: 'currency', baseline: 0, target: 2000000, current: 1400000, unit: '$' },
              progress: 70,
              confidence: 'on_track'
            },
          ],
          status: 'SUBMITTED',
          checkIns: [
            { id: 'tci-g-1-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'tkr-g-1-1', value: 1, progress: 10 }, { krId: 'tkr-g-1-2', value: 200000, progress: 10 }], overallProgress: 10, confidence: 'on_track' },
            { id: 'tci-g-1-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'tkr-g-1-1', value: 2, progress: 20 }, { krId: 'tkr-g-1-2', value: 500000, progress: 25 }], overallProgress: 22, confidence: 'on_track' },
            { id: 'tci-g-1-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'tkr-g-1-1', value: 3, progress: 30 }, { krId: 'tkr-g-1-2', value: 800000, progress: 40 }], overallProgress: 35, confidence: 'on_track' },
            { id: 'tci-g-1-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'tkr-g-1-1', value: 5, progress: 50 }, { krId: 'tkr-g-1-2', value: 1100000, progress: 55 }], overallProgress: 52, confidence: 'on_track' },
            { id: 'tci-g-1-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'tkr-g-1-1', value: 6, progress: 60 }, { krId: 'tkr-g-1-2', value: 1400000, progress: 70 }], overallProgress: 65, confidence: 'on_track' },
          ],
        },
      ],
    },
  ],
  operations: [
    {
      id: 'team-member-o-1',
      userId: 'user-o-1',
      userName: 'Nancy Zhao',
      userImage: null,
      okrs: [
        {
          id: 'team-okr-o-1',
          objective: 'Streamline HR and recruitment processes',
          keyResults: [
            {
              id: 'tkr-o-1-1',
              content: 'Reduce time-to-hire by 30%',
              metric: { type: 'percentage', baseline: 100, target: 70, current: 78, unit: '%' },
              progress: 73,
              confidence: 'on_track'
            },
            {
              id: 'tkr-o-1-2',
              content: 'Improve candidate experience score to 4.5+',
              metric: { type: 'number', baseline: 3.5, target: 4.5, current: 4.2, unit: '/5' },
              progress: 70,
              confidence: 'on_track'
            },
          ],
          status: 'SUBMITTED',
          checkIns: [
            { id: 'tci-o-1-1', weekNumber: 1, date: '2025-01-06', krProgress: [{ krId: 'tkr-o-1-1', value: 97, progress: 10 }, { krId: 'tkr-o-1-2', value: 3.6, progress: 10 }], overallProgress: 10, confidence: 'on_track' },
            { id: 'tci-o-1-2', weekNumber: 2, date: '2025-01-13', krProgress: [{ krId: 'tkr-o-1-1', value: 92, progress: 27 }, { krId: 'tkr-o-1-2', value: 3.75, progress: 25 }], overallProgress: 26, confidence: 'on_track' },
            { id: 'tci-o-1-3', weekNumber: 3, date: '2025-01-20', krProgress: [{ krId: 'tkr-o-1-1', value: 88, progress: 40 }, { krId: 'tkr-o-1-2', value: 3.9, progress: 40 }], overallProgress: 40, confidence: 'on_track' },
            { id: 'tci-o-1-4', weekNumber: 4, date: '2025-01-27', krProgress: [{ krId: 'tkr-o-1-1', value: 82, progress: 60 }, { krId: 'tkr-o-1-2', value: 4.05, progress: 55 }], overallProgress: 57, confidence: 'on_track' },
            { id: 'tci-o-1-5', weekNumber: 5, date: '2025-02-03', krProgress: [{ krId: 'tkr-o-1-1', value: 78, progress: 73 }, { krId: 'tkr-o-1-2', value: 4.2, progress: 70 }], overallProgress: 72, confidence: 'on_track' },
          ],
        },
      ],
    },
  ],
}

// Keep backward compatibility
export const mockTeamOKRs = mockTeamOKRsByDepartment.product

// Department progress summary (for trend chart)
export function getDepartmentProgressSummary(): Record<string, { weekNumber: number; progress: number }[]> {
  const result: Record<string, { weekNumber: number; progress: number }[]> = {}

  for (const deptId of Object.keys(mockLeaderOKRs)) {
    const deptOKRs = mockLeaderOKRs[deptId]
    const weeklyProgress: Record<number, number[]> = {}

    // Aggregate all check-ins by week
    for (const okr of deptOKRs) {
      for (const checkIn of okr.checkIns) {
        if (!weeklyProgress[checkIn.weekNumber]) {
          weeklyProgress[checkIn.weekNumber] = []
        }
        weeklyProgress[checkIn.weekNumber].push(checkIn.overallProgress)
      }
    }

    // Calculate average progress per week
    result[deptId] = Object.entries(weeklyProgress)
      .map(([week, progresses]) => ({
        weekNumber: parseInt(week),
        progress: Math.round(progresses.reduce((a, b) => a + b, 0) / progresses.length)
      }))
      .sort((a, b) => a.weekNumber - b.weekNumber)
  }

  return result
}

// Mock AI responses
export const mockAIObjective = 'Drive significant improvement in user activation and retention through a comprehensive onboarding redesign initiative'

export const mockAIKeyResults = [
  'Increase Day-7 user activation rate from 40% to 65%',
  'Reduce onboarding funnel drop-off by 40%',
  'Achieve user satisfaction score of 4.5/5 for onboarding experience',
  'Complete 3 iteration cycles based on user feedback',
]
