import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/thanh-toan?login=1",
  },
  callbacks: {
    async signIn({ user }) {
      // Cho phép tất cả email Google đăng nhập
      if (!user.email) return false
      return true
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        // Lấy role từ database
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: parseInt(token.sub) },
            select: { role: true },
          })
          if (dbUser) {
            ;(session.user as any).role = dbUser.role
          }
        } catch {
          // fallback
          ;(session.user as any).role = "customer"
        }
      }
      return session
    },
    async jwt({ token, account }) {
      if (account) {
        token.sub = account.userId
      }
      return token
    },
  },
})
