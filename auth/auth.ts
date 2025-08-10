import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Resend from "next-auth/providers/resend"
import { prisma } from "@/prisma"
import { NextResponse } from "next/server"
import { CreateCustomer } from "../src/domain/useCases/biling/createCustomer"
import { StripeRepository } from "../src/repositories/stripeRepository"
import { UserRepository } from "../src/repositories/userRepository"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Resend({
      from: "noreply@smartstudy.me",
    })
  ],
  session: {
    maxAge: 60 * 60 * 48
  },
  callbacks: {
    authorized: async ({ request, auth }) => {
      const url = request.nextUrl.pathname;
      if (!!auth && url == "/login") return NextResponse.redirect(new URL("/app", request.url));
      return !!auth
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: '/login'
  },
  events: {
    createUser: async (event) => {
      const { email, id } = event.user;
      const userRepository = new UserRepository();
      const stripeRepository = new StripeRepository();
      const createCustumer = new CreateCustomer(stripeRepository, userRepository);

      try {
        if (!email || !id) throw new Error("Erro ao recuperar usuário criado")
        await createCustumer.execute({ userId: id, email: email });
      } catch (e) {
        console.log("Este é o erro da mensagem: ", e)
      }
    }
  }
})