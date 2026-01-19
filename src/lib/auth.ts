/**
 * @file Authentication Configuration
 * @description NextAuth.js configuration with Google OAuth
 * @see PRD: docs/PRD.md - Function 1: Google Login
 */

import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions['adapter'],
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        // Fetch additional user info from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            role: true,
            departmentId: true,
          },
        })
        if (dbUser) {
          session.user.role = dbUser.role
          session.user.departmentId = dbUser.departmentId
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/onboarding',
  },
  session: {
    strategy: 'database',
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
