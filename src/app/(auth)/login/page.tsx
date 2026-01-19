/**
 * @file Login Page
 * @description Google OAuth login page - in demo mode, redirects to dashboard
 * @see PRD: Function 1 - Google Login
 */

import { redirect } from 'next/navigation'

export default function LoginPage() {
  // Demo mode: skip login, redirect to dashboard
  redirect('/my-okr')
}
