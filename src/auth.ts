import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Resend from "next-auth/providers/resend"
import { prisma } from "@/prisma"
import { NextResponse } from "next/server"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Resend(
    {
        from: "onboarding@resend.dev",
    }
  )],
  callbacks: {
    authorized: async ({ request,auth }) => {
      const url = request.nextUrl.pathname;
      if(!!auth && url == "/login") return NextResponse.redirect(new URL("/app",request.url));
      return !!auth
    },
  },
  pages: {
    signIn:"/login",
    verifyRequest: '/login', // Redireciona para a página inicial, ou defina outra página personalizada
    newUser : '/on-boarding',
  }, 
})