/**
 * @file AI Service
 * @description Anthropic Claude API integration for OKR generation
 * @see PRD: docs/PRD.md - Function 5: AI Guided Q&A
 */

import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface GenerateObjectiveParams {
  departmentGoal: string
  answers: {
    mostImportantThing: string
    whyImportant: string
  }
}

interface GenerateKeyResultsParams {
  departmentGoal: string
  objective: string
  answers: {
    keyActions: string
    successCriteria: string
  }
}

interface AIResult<T> {
  success: boolean
  data?: T
  feedback?: string
  error?: string
}

/**
 * Check if user's answer is too vague
 */
async function checkVagueness(answer: string): Promise<{ isVague: boolean; feedback?: string }> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 200,
    messages: [
      {
        role: 'user',
        content: `Analyze this answer for clarity and specificity. If it's too vague or generic, provide specific feedback on how to improve it. Answer in JSON format: {"isVague": boolean, "feedback": "string or null"}

Answer to analyze: "${answer}"`,
      },
    ],
  })

  try {
    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const result = JSON.parse(text)
    return result
  } catch {
    return { isVague: false }
  }
}

/**
 * Generate Objective based on user's answers
 */
export async function generateObjective(
  params: GenerateObjectiveParams
): Promise<AIResult<string>> {
  const { departmentGoal, answers } = params

  // Check for vague answers
  const vaguenessCheck = await checkVagueness(answers.mostImportantThing)
  if (vaguenessCheck.isVague) {
    return {
      success: false,
      feedback: vaguenessCheck.feedback || 'Please provide more specific details about your goal.',
    }
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `You are an OKR expert. Based on the following information, generate ONE clear and inspiring Objective (the "O" in OKR).

Department Goal: ${departmentGoal}

User's answers:
1. Most important thing to achieve this bi-monthly period: ${answers.mostImportantThing}
2. Why this is important and how it helps the department goal: ${answers.whyImportant}

Requirements:
- The Objective should be qualitative, inspirational, and time-bound
- It should align with the department goal
- Write in English
- Be concise but meaningful
- Do not include metrics (those belong in Key Results)

Respond with ONLY the Objective text, nothing else.`,
        },
      ],
    })

    const objective = response.content[0].type === 'text' ? response.content[0].text.trim() : ''

    return {
      success: true,
      data: objective,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate objective',
    }
  }
}

/**
 * Generate Key Results based on user's answers
 */
export async function generateKeyResults(
  params: GenerateKeyResultsParams
): Promise<AIResult<string[]>> {
  const { departmentGoal, objective, answers } = params

  // Check for vague answers
  const vaguenessCheck = await checkVagueness(answers.keyActions)
  if (vaguenessCheck.isVague) {
    return {
      success: false,
      feedback: vaguenessCheck.feedback || 'Please provide more specific details about the actions needed.',
    }
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      messages: [
        {
          role: 'user',
          content: `You are an OKR expert. Based on the following information, generate 3-4 Key Results (the "KR" in OKR) for the given Objective.

Department Goal: ${departmentGoal}

Objective: ${objective}

User's answers:
1. Key actions needed to achieve this objective: ${answers.keyActions}
2. Success criteria - how to measure achievement: ${answers.successCriteria}

Requirements:
- Key Results should be specific, measurable, and time-bound
- Each KR should directly contribute to achieving the Objective
- Write in English
- Use concrete metrics where possible
- Each KR should be achievable within the bi-monthly period

Respond with a JSON array of Key Result strings, like: ["KR1", "KR2", "KR3"]`,
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text.trim() : '[]'
    const keyResults = JSON.parse(text)

    return {
      success: true,
      data: keyResults,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate key results',
    }
  }
}

/**
 * Optimize an existing Objective based on feedback
 */
export async function optimizeObjective(
  currentObjective: string,
  feedback: string,
  departmentGoal: string
): Promise<AIResult<string>> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `You are an OKR expert. Please improve this Objective based on the user's feedback.

Department Goal: ${departmentGoal}

Current Objective: ${currentObjective}

User's feedback: ${feedback}

Requirements:
- Keep the core intent but address the feedback
- The Objective should be qualitative, inspirational, and time-bound
- Write in English
- Be concise but meaningful

Respond with ONLY the improved Objective text, nothing else.`,
        },
      ],
    })

    const objective = response.content[0].type === 'text' ? response.content[0].text.trim() : ''

    return {
      success: true,
      data: objective,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to optimize objective',
    }
  }
}

/**
 * Optimize existing Key Results based on feedback
 */
export async function optimizeKeyResults(
  objective: string,
  currentKeyResults: string[],
  feedback: string
): Promise<AIResult<string[]>> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      messages: [
        {
          role: 'user',
          content: `You are an OKR expert. Please improve these Key Results based on the user's feedback.

Objective: ${objective}

Current Key Results:
${currentKeyResults.map((kr, i) => `${i + 1}. ${kr}`).join('\n')}

User's feedback: ${feedback}

Requirements:
- Address the feedback while keeping useful parts
- Key Results should be specific, measurable, and time-bound
- Write in English
- Generate 3-4 Key Results

Respond with a JSON array of Key Result strings, like: ["KR1", "KR2", "KR3"]`,
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text.trim() : '[]'
    const keyResults = JSON.parse(text)

    return {
      success: true,
      data: keyResults,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to optimize key results',
    }
  }
}
