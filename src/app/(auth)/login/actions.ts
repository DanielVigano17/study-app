"use server"
import { signIn } from "../../../../auth/auth"

const actionLoginMagicLink = async (email: string) => {
    try {
        await signIn("resend", {
            email: email,
            redirect: false
        })
    } catch (e) {
        console.error("Erro ao enviar magic link:", e)
        throw e
    }
}

const actionLoginGoogle = async (callbackUrl?: string) => {
    await signIn("google", { redirect: true, redirectTo: callbackUrl })
}

export { actionLoginMagicLink, actionLoginGoogle }