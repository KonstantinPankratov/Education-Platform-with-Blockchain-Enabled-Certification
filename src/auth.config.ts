import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/sign-in',
    newUser : '/sign-up',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        user.initials

        if (user.first_name) {
          user.initials += user.first_name.chartAt(0)
        }

        if (user.last_name) {
          user.initials += user.last_name.chartAt(0)
        }

        if (!user.initials)
        {
          user.initials = '-/-'
        }
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
} satisfies NextAuthConfig