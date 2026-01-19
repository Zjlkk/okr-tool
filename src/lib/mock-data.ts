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
  { id: 'ceo', name: 'CEO', leaderId: 'leader-0', leaderName: 'Alex Thompson' },
  { id: 'product', name: 'Product', leaderId: 'leader-1', leaderName: 'Sarah Chen' },
  { id: 'design', name: 'Design', leaderId: 'leader-2', leaderName: 'Mike Johnson' },
  { id: 'engineering', name: 'Engineering', leaderId: 'leader-3', leaderName: 'David Kim' },
  { id: 'gtm', name: 'GTM', leaderId: 'leader-4', leaderName: 'Emily Wang' },
  { id: 'operations', name: 'Operations', leaderId: 'leader-5', leaderName: 'James Liu' },
]

export const mockDepartmentGoal = 'Increase user activation rate by 30% and reduce churn by 15% through improved onboarding experience and proactive engagement strategies.'

// Leader OKRs for each department (3 Objectives each, 3-4 KRs per Objective)
export const mockLeaderOKRs: Record<string, {
  id: string
  objective: string
  keyResults: { id: string; content: string }[]
  status: 'DRAFT' | 'SUBMITTED'
}[]> = {
  ceo: [
    {
      id: 'leader-okr-ceo-1',
      objective: 'Drive company-wide growth and market leadership',
      keyResults: [
        { id: 'lkr-c-1-1', content: 'Increase ARR from $5M to $10M' },
        { id: 'lkr-c-1-2', content: 'Expand to 3 new international markets' },
        { id: 'lkr-c-1-3', content: 'Achieve Series B funding of $30M+' },
        { id: 'lkr-c-1-4', content: 'Grow team from 50 to 100 employees' },
      ],
      status: 'SUBMITTED',
    },
    {
      id: 'leader-okr-ceo-2',
      objective: 'Build a world-class leadership team and company culture',
      keyResults: [
        { id: 'lkr-c-2-1', content: 'Hire 3 senior executives (CTO, CFO, CMO)' },
        { id: 'lkr-c-2-2', content: 'Achieve employee NPS of 70+' },
        { id: 'lkr-c-2-3', content: 'Maintain voluntary turnover below 10%' },
        { id: 'lkr-c-2-4', content: 'Complete leadership development program for all managers' },
      ],
      status: 'SUBMITTED',
    },
    {
      id: 'leader-okr-ceo-3',
      objective: 'Establish strategic partnerships and ecosystem',
      keyResults: [
        { id: 'lkr-c-3-1', content: 'Close 5 strategic partnership deals' },
        { id: 'lkr-c-3-2', content: 'Launch partner program with 20+ certified partners' },
        { id: 'lkr-c-3-3', content: 'Generate 25% of revenue through partner channel' },
      ],
      status: 'SUBMITTED',
    },
  ],
  product: [
    {
      id: 'leader-okr-product-1',
      objective: 'Drive product-led growth through improved user activation',
      keyResults: [
        { id: 'lkr-p-1-1', content: 'Increase Day-7 activation rate from 40% to 60%' },
        { id: 'lkr-p-1-2', content: 'Reduce onboarding drop-off rate by 50%' },
        { id: 'lkr-p-1-3', content: 'Achieve product NPS score of 50+' },
        { id: 'lkr-p-1-4', content: 'Increase free-to-paid conversion rate from 5% to 10%' },
      ],
      status: 'SUBMITTED',
    },
    {
      id: 'leader-okr-product-2',
      objective: 'Launch enterprise-grade features to expand market',
      keyResults: [
        { id: 'lkr-p-2-1', content: 'Ship SSO and SAML authentication' },
        { id: 'lkr-p-2-2', content: 'Launch role-based access control (RBAC)' },
        { id: 'lkr-p-2-3', content: 'Achieve SOC 2 Type II compliance' },
        { id: 'lkr-p-2-4', content: 'Onboard 10 enterprise customers to new features' },
      ],
      status: 'SUBMITTED',
    },
    {
      id: 'leader-okr-product-3',
      objective: 'Build data-driven product decision framework',
      keyResults: [
        { id: 'lkr-p-3-1', content: 'Implement tracking for 100% of key user actions' },
        { id: 'lkr-p-3-2', content: 'Create weekly product metrics dashboard' },
        { id: 'lkr-p-3-3', content: 'Run 10 A/B tests with statistically significant results' },
      ],
      status: 'DRAFT',
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
        { id: 'lkr-d-1-4', content: 'Launch Figma component library with 100% adoption' },
      ],
      status: 'SUBMITTED',
    },
    {
      id: 'leader-okr-design-2',
      objective: 'Improve user experience through research-driven design',
      keyResults: [
        { id: 'lkr-d-2-1', content: 'Conduct 30+ user interviews per quarter' },
        { id: 'lkr-d-2-2', content: 'Increase task completion rate from 70% to 90%' },
        { id: 'lkr-d-2-3', content: 'Reduce user error rate by 60%' },
        { id: 'lkr-d-2-4', content: 'Achieve SUS (System Usability Scale) score of 80+' },
      ],
      status: 'SUBMITTED',
    },
    {
      id: 'leader-okr-design-3',
      objective: 'Scale design team and processes',
      keyResults: [
        { id: 'lkr-d-3-1', content: 'Hire 3 senior designers across UX, UI, and motion' },
        { id: 'lkr-d-3-2', content: 'Implement design critique process with weekly reviews' },
        { id: 'lkr-d-3-3', content: 'Reduce design cycle time from 2 weeks to 1 week' },
      ],
      status: 'DRAFT',
    },
  ],
  engineering: [
    {
      id: 'leader-okr-eng-1',
      objective: 'Build a scalable and reliable technical infrastructure',
      keyResults: [
        { id: 'lkr-e-1-1', content: 'Achieve 99.9% system uptime' },
        { id: 'lkr-e-1-2', content: 'Reduce average API response time to under 100ms' },
        { id: 'lkr-e-1-3', content: 'Scale infrastructure to handle 10x current load' },
        { id: 'lkr-e-1-4', content: 'Implement auto-scaling with zero manual intervention' },
      ],
      status: 'SUBMITTED',
    },
    {
      id: 'leader-okr-eng-2',
      objective: 'Improve engineering productivity and code quality',
      keyResults: [
        { id: 'lkr-e-2-1', content: 'Implement CI/CD pipeline with 80% test coverage' },
        { id: 'lkr-e-2-2', content: 'Reduce deployment time from 30 min to 5 min' },
        { id: 'lkr-e-2-3', content: 'Achieve PR merge time under 24 hours' },
        { id: 'lkr-e-2-4', content: 'Reduce production bugs by 50%' },
      ],
      status: 'SUBMITTED',
    },
    {
      id: 'leader-okr-eng-3',
      objective: 'Strengthen security and compliance posture',
      keyResults: [
        { id: 'lkr-e-3-1', content: 'Complete security audit with zero critical findings' },
        { id: 'lkr-e-3-2', content: 'Implement end-to-end encryption for all data' },
        { id: 'lkr-e-3-3', content: 'Achieve GDPR and CCPA compliance' },
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
        { id: 'lkr-g-1-2', content: 'Launch in 3 new geographic markets (EU, APAC, LATAM)' },
        { id: 'lkr-g-1-3', content: 'Achieve 120% net revenue retention' },
        { id: 'lkr-g-1-4', content: 'Reduce customer acquisition cost (CAC) by 20%' },
      ],
      status: 'SUBMITTED',
    },
    {
      id: 'leader-okr-gtm-2',
      objective: 'Build high-performing sales organization',
      keyResults: [
        { id: 'lkr-g-2-1', content: 'Hire and ramp 10 new account executives' },
        { id: 'lkr-g-2-2', content: 'Achieve 80% quota attainment across sales team' },
        { id: 'lkr-g-2-3', content: 'Reduce sales cycle from 60 days to 45 days' },
        { id: 'lkr-g-2-4', content: 'Implement sales playbook with 90% adoption' },
      ],
      status: 'SUBMITTED',
    },
    {
      id: 'leader-okr-gtm-3',
      objective: 'Establish thought leadership and brand awareness',
      keyResults: [
        { id: 'lkr-g-3-1', content: 'Increase organic website traffic by 100%' },
        { id: 'lkr-g-3-2', content: 'Publish 20 thought leadership articles' },
        { id: 'lkr-g-3-3', content: 'Speak at 10 industry conferences' },
      ],
      status: 'DRAFT',
    },
  ],
  operations: [
    {
      id: 'leader-okr-ops-1',
      objective: 'Optimize operational efficiency and cost structure',
      keyResults: [
        { id: 'lkr-o-1-1', content: 'Reduce operational costs by 20%' },
        { id: 'lkr-o-1-2', content: 'Implement automated workflows for 80% of repetitive tasks' },
        { id: 'lkr-o-1-3', content: 'Reduce vendor management overhead by 30%' },
        { id: 'lkr-o-1-4', content: 'Achieve 95% on-time delivery for internal SLAs' },
      ],
      status: 'SUBMITTED',
    },
    {
      id: 'leader-okr-ops-2',
      objective: 'Build exceptional employee experience',
      keyResults: [
        { id: 'lkr-o-2-1', content: 'Achieve employee satisfaction score of 4.5/5' },
        { id: 'lkr-o-2-2', content: 'Reduce time-to-hire from 45 days to 30 days' },
        { id: 'lkr-o-2-3', content: 'Implement comprehensive onboarding with 90% satisfaction' },
        { id: 'lkr-o-2-4', content: 'Launch learning & development program with 80% participation' },
      ],
      status: 'SUBMITTED',
    },
    {
      id: 'leader-okr-ops-3',
      objective: 'Strengthen financial planning and reporting',
      keyResults: [
        { id: 'lkr-o-3-1', content: 'Implement monthly close process within 5 business days' },
        { id: 'lkr-o-3-2', content: 'Achieve budget variance under 5%' },
        { id: 'lkr-o-3-3', content: 'Launch real-time financial dashboard for leadership' },
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
  ceo: [],
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
