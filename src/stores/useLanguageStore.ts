/**
 * @file Language Store
 * @description Multi-language support with CN/EN (UI display only, output always English)
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'en' | 'zh'

interface Translations {
  [key: string]: string
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    'nav.myOkr': 'My OKR',
    'nav.teamOkr': 'Team OKR',
    'nav.createOkr': 'Create OKR',
    'nav.settings': 'Settings',
    'nav.signOut': 'Sign Out',

    // My OKR Page
    'myOkr.title': 'My OKR',
    'myOkr.addObjective': 'Add Objective',
    'myOkr.noOkrs': 'No OKRs yet',
    'myOkr.startCreating': 'Start by creating your first Objective for this period.',
    'myOkr.createFirst': 'Create Your First OKR',
    'myOkr.minimumWarning': 'You need at least 3 Objectives to submit. Currently: {current}/3',
    'myOkr.editing': 'Editing',
    'myOkr.editSuccess': 'OKR updated successfully',
    'myOkr.deleteSuccess': 'OKR deleted successfully',

    // Team OKR Page
    'teamOkr.title': 'Team OKR',
    'teamOkr.departmentGoal': 'Department Goal',
    'teamOkr.goalNotSet': 'Department Goal Not Set',
    'teamOkr.goalNotSetDesc': 'Leader needs to set the department goal for this period.',
    'teamOkr.remindLeader': 'Remind Leader',
    'teamOkr.leaderOkr': "Leader's OKR",
    'teamOkr.teamMembersOkr': "Team Members' OKR",
    'teamOkr.noOkrs': 'No OKRs yet',
    'teamOkr.noOkrsDesc': "Team members haven't created OKRs for this period yet.",

    // Create OKR Page
    'create.title': 'Create OKR',
    'create.objectives': 'Objectives',
    'create.manualMode': 'Manual Mode',
    'create.aiMode': 'Use AI Mode',
    'create.phaseA': 'Phase A: Create Objective',
    'create.phaseB': 'Phase B: Define Key Results',
    'create.previous': 'Previous',
    'create.next': 'Next',
    'create.generateAi': 'Generate with AI',
    'create.generatedObjective': 'Generated Objective',
    'create.generatedKeyResults': 'Generated Key Results',
    'create.notSatisfied': 'Not satisfied? Improve',
    'create.regenerate': 'Regenerate',
    'create.cancel': 'Cancel',
    'create.confirmContinue': 'Confirm & Continue',
    'create.confirmKeyResults': 'Confirm Key Results',
    'create.writeYourOkr': 'Write Your OKR',
    'create.objective': 'Objective',
    'create.keyResults': 'Key Results',
    'create.addKeyResult': 'Add Key Result',
    'create.saveObjective': 'Save Objective',
    'create.confirmedObjectives': 'Confirmed Objectives',
    'create.needMore': 'Need {count} more objective(s) to submit',
    'create.readySubmit': 'Ready to submit!',
    'create.submitAll': 'Submit All OKRs',
    'create.settingUpObjective': 'Setting up your {n} objective',
    'create.minimumRequired': 'You need at least 3 objectives to submit your OKRs',

    // Questions
    'question.mostImportant': 'What is the most important thing you want to achieve this bi-monthly period? What is your goal?',
    'question.whyImportant': 'Why is this important? How does it help the department goal?',
    'question.keyPaths': 'List 3-4 specific paths to achieve the above objective',
    'question.successCriteria': 'How will you know you have achieved it? What metrics define success?',

    // Status
    'status.submitted': 'Submitted',
    'status.draft': 'Draft',

    // Common
    'common.loading': 'Loading...',
    'common.teamLeader': 'Team Leader',
    'common.teamMember': 'Team Member',
  },
  zh: {
    // Navigation
    'nav.myOkr': '我的 OKR',
    'nav.teamOkr': '团队 OKR',
    'nav.createOkr': '创建 OKR',
    'nav.settings': '设置',
    'nav.signOut': '退出登录',

    // My OKR Page
    'myOkr.title': '我的 OKR',
    'myOkr.addObjective': '添加目标',
    'myOkr.noOkrs': '暂无 OKR',
    'myOkr.startCreating': '开始为本期创建您的第一个目标。',
    'myOkr.createFirst': '创建首个 OKR',
    'myOkr.minimumWarning': '至少需要 3 个目标才能提交。当前：{current}/3',
    'myOkr.editing': '编辑中',
    'myOkr.editSuccess': 'OKR 更新成功',
    'myOkr.deleteSuccess': 'OKR 删除成功',

    // Team OKR Page
    'teamOkr.title': '团队 OKR',
    'teamOkr.departmentGoal': '部门目标',
    'teamOkr.goalNotSet': '部门目标未设置',
    'teamOkr.goalNotSetDesc': '负责人需要为本期设置部门目标。',
    'teamOkr.remindLeader': '提醒负责人',
    'teamOkr.leaderOkr': '负责人的 OKR',
    'teamOkr.teamMembersOkr': '团队成员的 OKR',
    'teamOkr.noOkrs': '暂无 OKR',
    'teamOkr.noOkrsDesc': '团队成员尚未为本期创建 OKR。',

    // Create OKR Page
    'create.title': '创建 OKR',
    'create.objectives': '目标',
    'create.manualMode': '手动模式',
    'create.aiMode': '使用 AI 模式',
    'create.phaseA': '阶段 A：创建目标',
    'create.phaseB': '阶段 B：定义关键结果',
    'create.previous': '上一步',
    'create.next': '下一步',
    'create.generateAi': '使用 AI 生成',
    'create.generatedObjective': '生成的目标',
    'create.generatedKeyResults': '生成的关键结果',
    'create.notSatisfied': '不满意？优化',
    'create.regenerate': '重新生成',
    'create.cancel': '取消',
    'create.confirmContinue': '确认并继续',
    'create.confirmKeyResults': '确认关键结果',
    'create.writeYourOkr': '编写您的 OKR',
    'create.objective': '目标',
    'create.keyResults': '关键结果',
    'create.addKeyResult': '添加关键结果',
    'create.saveObjective': '保存目标',
    'create.confirmedObjectives': '已确认的目标',
    'create.needMore': '还需要 {count} 个目标才能提交',
    'create.readySubmit': '准备提交！',
    'create.submitAll': '提交所有 OKR',
    'create.settingUpObjective': '正在设置第 {n} 个目标',
    'create.minimumRequired': '您至少需要 3 个目标才能提交 OKR',

    // Questions
    'question.mostImportant': '这两个月你最想达成的事情是什么？你的目标是什么？',
    'question.whyImportant': '为什么这很重要？它如何帮助实现部门目标？',
    'question.keyPaths': '列出 3-4 个实现上述目标的具体路径',
    'question.successCriteria': '你如何知道自己已经实现了目标？哪些指标定义成功？',

    // Status
    'status.submitted': '已提交',
    'status.draft': '草稿',

    // Common
    'common.loading': '加载中...',
    'common.teamLeader': '团队负责人',
    'common.teamMember': '团队成员',
  },
}

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      t: (key) => {
        const { language } = get()
        return translations[language][key] || key
      },
    }),
    {
      name: 'okr-language',
    }
  )
)
