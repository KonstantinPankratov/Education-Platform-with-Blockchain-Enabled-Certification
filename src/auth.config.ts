import type { NextAuthConfig } from 'next-auth'

const createInitials = (firstName: string | undefined, lastName: string | undefined) => {
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
        token._id = user._id
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.nameInitials = createInitials(user.firstName, user.lastName)
      }
      return token
    },
    async session({ session, token }) {
      session.user.firstName = token.firstName
      session.user.lastName = token.lastName
      session.user.nameInitials = token.nameInitials
      session.user._id = token._id
      return session
    },
  }
} satisfies NextAuthConfig