import { auth } from "./auth";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { checkSubscription } from "../src/middleware/checkSubscription";

export async function checkUserAuth(redirectTo: string = "/login") : Promise<Session | null> {
  const session = await auth();
  
  if (!session) {
    redirect(redirectTo);
  }
  
  return session;
}

export async function checkUserSubscription(redirectTo: string = "/login") : Promise<Session | null> {
  const session = await auth();
  
  if (!session) {
    redirect(redirectTo);
  }
  
  if (!session.user.subscriptionId) {
    redirect("/billing");
  }
  
  await checkSubscription();
  
  return session;
}
