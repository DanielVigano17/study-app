import { auth } from "./auth";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

export async function checkUserAuth(redirectTo: string = "/login") : Promise<Session | null> {
  const session = await auth();
  
  if (!session) {
    redirect(redirectTo);
  }
  
  return session;
}

export async function checkUserAuthWithSubscription(redirectTo: string = "/login") : Promise<Session | null> {
  const session = await auth();
  
  if (!session) {
    redirect(redirectTo);
  }
  
  // Verifica se o usuário tem uma assinatura ativa
  if (!session.user.subscriptionId) {
    redirect("/billing");
  }
  
  return session;
}
