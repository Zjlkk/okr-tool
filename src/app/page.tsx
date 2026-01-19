/**
 * @file Home Page
 * @description Redirects to dashboard (demo mode - no auth required)
 */

import { redirect } from 'next/navigation'

export default function HomePage() {
  // Demo mode: redirect directly to dashboard
  redirect('/my-okr')
}
