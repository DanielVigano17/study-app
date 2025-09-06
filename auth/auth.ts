import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Resend from "next-auth/providers/resend"
import { prisma } from "@/prisma"
import { NextResponse } from "next/server"
import { CreateCustomer } from "../src/domain/useCases/biling/createCustomer"
import { StripeRepository } from "../src/repositories/stripeRepository"
import { UserRepository } from "../src/repositories/userRepository"
import Google from "next-auth/providers/google"
import { EmailService } from "../src/services/email-service"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Resend({
      from: "SmartStudy <noreply@smartstudy.me>",
      async sendVerificationRequest({ identifier: email, url, provider: { from } }) {
        try {
          console.log(`Enviando magic link para: ${email}`);
          console.log(`URL do magic link: ${url}`);
          
          // Verifica se o serviço de email está configurado
          if (!EmailService.isConfigured()) {
            console.error('RESEND_API_KEY não está configurada');
            throw new Error('Serviço de email não configurado');
          }

          // Envia o email personalizado usando nosso serviço
          await EmailService.sendMagicLinkEmail({
            to: email,
            magicLink: url,
            from: from || "SmartStudy <noreply@smartstudy.me>"
          });

          console.log(`Magic link enviado com sucesso para: ${email}`);
        } catch (error) {
          console.error('Erro ao enviar magic link:', error);
          throw new Error(
            error instanceof Error 
              ? `Falha ao enviar email: ${error.message}`
              : 'Erro desconhecido ao enviar email'
          );
        }
      }
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