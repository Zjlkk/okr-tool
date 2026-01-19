/**
 * @file Authentication Configuration
 * @description NextAuth.js configuration - demo mode disabled
 * @see PRD: docs/PRD.md - Function 1: Google Login
 */

import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// Demo mode: minimal auth config (not used in demo)
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-client-secret',
    }),
  ],
  pages: {
    signIn: '/login',
    newUser: '/onboarding',
  },
}

// Type augmentation for NextAuth
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: 'LEADER' | 'MEMBER' | null
      departmentId?: string | null
    }
  }
}
