import type { NextAuthConfig } from 'next-auth'
import { createInitials } from './lib/helpers'

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/sign-in',
    verifyRequest: '/sign-in'
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id
        token.nameInitials = user.name ? createInitials(user.name) : ''
      }
      return token
    },
    async session({ session, token }) {
      session.user._id = token._id
      session.user.nameInitials = token.nameInitials
      return session
    },
  }
} satisfies NextAuthConfig