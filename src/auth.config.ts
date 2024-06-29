import type { NextAuthConfig } from 'next-auth'

const createInitials = (firstName: string, lastName: string) => {
  if (!firstName || !lastName) {
    return ''
  }

  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
}

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/sign-in',
    newUser : '/sign-up',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.nameInitials = createInitials(user.firstName, user.lastName)
      }
      return token
    },
    async session({ session, token }) {
      session.user.first_name = token.firstName
      session.user.last_name = token.lastName
      session.user.nameInitials = token.nameInitials
      session.user.id = token.id
      return session
    },
  }
} satisfies NextAuthConfig