"use server"
import { signIn } from "../../../../auth/auth"

const actionLoginMagicLink = async (email: string, redirectTo: string) => {
  await signIn("resend", {
    email,
    redirect: false,
    redirectTo,
  })
}

const actionLoginGoogle = async (callbackUrl: string) => {
  await signIn("google", { redirect: true, redirectTo: callbackUrl })
}

export { actionLoginMagicLink, actionLoginGoogle }