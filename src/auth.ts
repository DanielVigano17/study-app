import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Resend from "next-auth/providers/resend"
import { prisma } from "@/prisma"
import { NextResponse } from "next/server"
import { CreateCustomer } from "./domain/useCases/biling/createCustomer"
import { StripeRepository } from "./repositories/stripeRepository"
import { UserRepository } from "./repositories/userRepository"
import { CreateSubscription } from "./domain/useCases/biling/createSubscription"

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
  events : {
    createUser : async (event) => {
      const {email,id} = event.user;
      const userRepository = new UserRepository();
      const stripeRepository = new StripeRepository();
      const createCustumer = new CreateCustomer(stripeRepository,userRepository);
      const createSubscription = new CreateSubscription(stripeRepository,userRepository);

      try{
        if(!email || !id) throw new Error("Erro ao recuperar usuário criado")
        const user = await createCustumer.execute({userId : id, email : email});
        const updatedUser = await createSubscription.execute(user.customerId!,user.id);
      }catch(e){
        console.log("Este é o erro da mensagem: ",e)
      }
    }
  } 
})