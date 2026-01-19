/**
 * @file Team OKR Page
 * @description Redirects to the first department (CEO)
 */

import { redirect } from 'next/navigation'

export default function TeamOKRPage() {
  redirect('/team-okr/ceo')
}
