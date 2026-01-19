/**
 * @file Onboarding Page
 * @description First-time user setup - in demo mode, redirects to dashboard
 * @see PRD: Function 2 - Identity Selection
 */

import { redirect } from 'next/navigation'

export default function OnboardingPage() {
  // Demo mode: user is already set up with mock data, redirect to dashboard
  redirect('/my-okr')
}
