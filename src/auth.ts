import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const useSecureAdapter = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Demo",
      credentials: {},
      async authorize() {
        return { id: "demo-user-123", name: "Demo User", email: "demo@climateguard.app" }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
})
