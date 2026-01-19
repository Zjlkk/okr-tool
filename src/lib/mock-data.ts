/**
 * @file Mock Data
 * @description Mock data for frontend testing without backend
 */

export const mockUser = {
  id: 'demo-user-1',
  name: 'Demo User',
  email: 'demo@company.com',
  image: null,
  role: 'MEMBER' as 'LEADER' | 'MEMBER',
  departmentId: 'product',
}

export const mockDepartments = [
  { id: 'product', name: 'Product', leaderId: 'leader-1', leaderName: 'Product Lead' },
  { id: 'design', name: 'Design', leaderId: 'leader-2', leaderName: 'Design Lead' },
  { id: 'engineering', name: 'Engineering', leaderId: 'leader-3', leaderName: 'Engineering Lead' },
  { id: 'gtm', name: 'GTM', leaderId: 'leader-4', leaderName: 'GTM Lead' },
  { id: 'operations', name: 'Operations', leaderId: 'leader-5', leaderName: 'Operations Lead' },
]

export const mockDepartmentGoal = 'Increase user activation rate by 30% and reduce churn by 15% through improved onboarding experience and proactive engagement strategies.'

export const mockOKRs = [
  {
    id: 'okr-1',
    objective: 'Launch new user onboarding flow to improve first-week activation',
    keyResults: [
      { id: 'kr-1-1', content: 'Increase Day-7 activation rate from 40% to 60%' },
      { id: 'kr-1-2', content: 'Reduce onboarding drop-off rate by 50%' },
      { id: 'kr-1-3', content: 'Achieve NPS score of 50+ for new users' },
    ],
    status: 'SUBMITTED' as const,
  },
  {
    id: 'okr-2',
    objective: 'Build data-driven product decision framework',
    keyResults: [
      { id: 'kr-2-1', content: 'Implement tracking for 100% of key user actions' },
      { id: 'kr-2-2', content: 'Create weekly product metrics dashboard' },
      { id: 'kr-2-3', content: 'Run 5 A/B tests with statistically significant results' },
    ],
    status: 'SUBMITTED' as const,
  },
  {
    id: 'okr-3',
    objective: 'Strengthen cross-functional collaboration with engineering',
    keyResults: [
      { id: 'kr-3-1', content: 'Reduce spec-to-launch cycle time by 20%' },
      { id: 'kr-3-2', content: 'Achieve 90% on-time delivery for sprint commitments' },
      { id: 'kr-3-3', content: 'Conduct bi-weekly design reviews with engineering' },
    ],
    status: 'DRAFT' as const,
  },
]

export const mockTeamOKRs = [
  {
    id: 'team-okr-1',
    userId: 'user-1',
    userName: 'Alice Chen',
    userImage: null,
    objective: 'Redesign the dashboard to improve user engagement',
    keyResults: [
      { id: 'tkr-1-1', content: 'Increase daily active usage by 25%' },
      { id: 'tkr-1-2', content: 'Reduce time-to-insight by 40%' },
    ],
    status: 'SUBMITTED' as const,
  },
  {
    id: 'team-okr-2',
    userId: 'user-2',
    userName: 'Bob Wang',
    userImage: null,
    objective: 'Implement automated testing pipeline',
    keyResults: [
      { id: 'tkr-2-1', content: 'Achieve 80% code coverage' },
      { id: 'tkr-2-2', content: 'Reduce bug escape rate by 50%' },
    ],
    status: 'SUBMITTED' as const,
  },
  {
    id: 'team-okr-3',
    userId: 'user-3',
    userName: 'Carol Liu',
    userImage: null,
    objective: 'Launch mobile app v2.0',
    keyResults: [
      { id: 'tkr-3-1', content: 'Reach 10,000 downloads in first month' },
      { id: 'tkr-3-2', content: 'Achieve 4.5+ star rating' },
    ],
    status: 'DRAFT' as const,
  },
]

// Mock AI responses
export const mockAIObjective = 'Drive significant improvement in user activation and retention through a comprehensive onboarding redesign initiative'

export const mockAIKeyResults = [
  'Increase Day-7 user activation rate from 40% to 65%',
  'Reduce onboarding funnel drop-off by 40%',
  'Achieve user satisfaction score of 4.5/5 for onboarding experience',
  'Complete 3 iteration cycles based on user feedback',
]
