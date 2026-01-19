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
  { id: 'product', name: 'Product', leaderId: 'leader-1', leaderName: 'Sarah Chen' },
  { id: 'design', name: 'Design', leaderId: 'leader-2', leaderName: 'Mike Johnson' },
  { id: 'engineering', name: 'Engineering', leaderId: 'leader-3', leaderName: 'David Kim' },
  { id: 'gtm', name: 'GTM', leaderId: 'leader-4', leaderName: 'Emily Wang' },
  { id: 'operations', name: 'Operations', leaderId: 'leader-5', leaderName: 'James Liu' },
]

export const mockDepartmentGoal = 'Increase user activation rate by 30% and reduce churn by 15% through improved onboarding experience and proactive engagement strategies.'

// Leader OKRs for each department
export const mockLeaderOKRs: Record<string, {
  id: string
  objective: string
  keyResults: { id: string; content: string }[]
  status: 'DRAFT' | 'SUBMITTED'
}[]> = {
  product: [
    {
      id: 'leader-okr-product-1',
      objective: 'Drive product-led growth through improved user activation',
      keyResults: [
        { id: 'lkr-p-1-1', content: 'Increase Day-7 activation rate from 40% to 60%' },
        { id: 'lkr-p-1-2', content: 'Launch 3 new features based on user feedback' },
        { id: 'lkr-p-1-3', content: 'Achieve product NPS score of 50+' },
      ],
      status: 'SUBMITTED',
    },
  ],
  design: [
    {
      id: 'leader-okr-design-1',
      objective: 'Establish a world-class design system and brand identity',
      keyResults: [
        { id: 'lkr-d-1-1', content: 'Complete design system documentation with 100+ components' },
        { id: 'lkr-d-1-2', content: 'Reduce design-to-development handoff time by 40%' },
        { id: 'lkr-d-1-3', content: 'Achieve 90% design consistency score across all products' },
      ],
      status: 'SUBMITTED',
    },
  ],
  engineering: [
    {
      id: 'leader-okr-eng-1',
      objective: 'Build a scalable and reliable technical infrastructure',
      keyResults: [
        { id: 'lkr-e-1-1', content: 'Achieve 99.9% system uptime' },
        { id: 'lkr-e-1-2', content: 'Reduce average API response time to under 100ms' },
        { id: 'lkr-e-1-3', content: 'Implement CI/CD pipeline with 80% test coverage' },
      ],
      status: 'SUBMITTED',
    },
  ],
  gtm: [
    {
      id: 'leader-okr-gtm-1',
      objective: 'Accelerate market expansion and revenue growth',
      keyResults: [
        { id: 'lkr-g-1-1', content: 'Increase MRR by 50% through new customer acquisition' },
        { id: 'lkr-g-1-2', content: 'Launch in 3 new geographic markets' },
        { id: 'lkr-g-1-3', content: 'Achieve 120% net revenue retention' },
      ],
      status: 'SUBMITTED',
    },
  ],
  operations: [
    {
      id: 'leader-okr-ops-1',
      objective: 'Optimize operational efficiency and team productivity',
      keyResults: [
        { id: 'lkr-o-1-1', content: 'Reduce operational costs by 20%' },
        { id: 'lkr-o-1-2', content: 'Implement automated workflows for 80% of repetitive tasks' },
        { id: 'lkr-o-1-3', content: 'Achieve employee satisfaction score of 4.5/5' },
      ],
      status: 'SUBMITTED',
    },
  ],
}

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

// Team member OKRs for each department
export const mockTeamOKRsByDepartment: Record<string, {
  id: string
  userId: string
  userName: string
  userImage: string | null
  objective: string
  keyResults: { id: string; content: string }[]
  status: 'DRAFT' | 'SUBMITTED'
}[]> = {
  product: [
    {
      id: 'team-okr-p-1',
      userId: 'user-p-1',
      userName: 'Alice Chen',
      userImage: null,
      objective: 'Redesign the dashboard to improve user engagement',
      keyResults: [
        { id: 'tkr-p-1-1', content: 'Increase daily active usage by 25%' },
        { id: 'tkr-p-1-2', content: 'Reduce time-to-insight by 40%' },
      ],
      status: 'SUBMITTED',
    },
    {
      id: 'team-okr-p-2',
      userId: 'user-p-2',
      userName: 'Bob Wang',
      userImage: null,
      objective: 'Improve product analytics capabilities',
      keyResults: [
        { id: 'tkr-p-2-1', content: 'Implement real-time event tracking' },
        { id: 'tkr-p-2-2', content: 'Create 10 actionable dashboard reports' },
      ],
      status: 'SUBMITTED',
    },
  ],
  design: [
    {
      id: 'team-okr-d-1',
      userId: 'user-d-1',
      userName: 'Lisa Park',
      userImage: null,
      objective: 'Create comprehensive icon and illustration library',
      keyResults: [
        { id: 'tkr-d-1-1', content: 'Design 200+ custom icons' },
        { id: 'tkr-d-1-2', content: 'Create 50 branded illustrations' },
      ],
      status: 'SUBMITTED',
    },
  ],
  engineering: [
    {
      id: 'team-okr-e-1',
      userId: 'user-e-1',
      userName: 'Tom Zhang',
      userImage: null,
      objective: 'Migrate infrastructure to Kubernetes',
      keyResults: [
        { id: 'tkr-e-1-1', content: 'Migrate 100% of services to K8s' },
        { id: 'tkr-e-1-2', content: 'Reduce deployment time by 60%' },
      ],
      status: 'SUBMITTED',
    },
    {
      id: 'team-okr-e-2',
      userId: 'user-e-2',
      userName: 'Jenny Li',
      userImage: null,
      objective: 'Implement comprehensive monitoring system',
      keyResults: [
        { id: 'tkr-e-2-1', content: 'Set up alerting for all critical paths' },
        { id: 'tkr-e-2-2', content: 'Achieve MTTR under 15 minutes' },
      ],
      status: 'DRAFT',
    },
  ],
  gtm: [
    {
      id: 'team-okr-g-1',
      userId: 'user-g-1',
      userName: 'Kevin Wu',
      userImage: null,
      objective: 'Launch enterprise sales program',
      keyResults: [
        { id: 'tkr-g-1-1', content: 'Close 10 enterprise deals' },
        { id: 'tkr-g-1-2', content: 'Build pipeline of $2M ARR' },
      ],
      status: 'SUBMITTED',
    },
  ],
  operations: [
    {
      id: 'team-okr-o-1',
      userId: 'user-o-1',
      userName: 'Nancy Zhao',
      userImage: null,
      objective: 'Streamline HR and recruitment processes',
      keyResults: [
        { id: 'tkr-o-1-1', content: 'Reduce time-to-hire by 30%' },
        { id: 'tkr-o-1-2', content: 'Improve candidate experience score to 4.5+' },
      ],
      status: 'SUBMITTED',
    },
  ],
}

// Keep backward compatibility
export const mockTeamOKRs = mockTeamOKRsByDepartment.product

// Mock AI responses
export const mockAIObjective = 'Drive significant improvement in user activation and retention through a comprehensive onboarding redesign initiative'

export const mockAIKeyResults = [
  'Increase Day-7 user activation rate from 40% to 65%',
  'Reduce onboarding funnel drop-off by 40%',
  'Achieve user satisfaction score of 4.5/5 for onboarding experience',
  'Complete 3 iteration cycles based on user feedback',
]
