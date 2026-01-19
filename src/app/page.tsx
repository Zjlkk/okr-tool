/**
 * @file Home Page
 * @description Redirects to login page
 */

import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/login')
}
