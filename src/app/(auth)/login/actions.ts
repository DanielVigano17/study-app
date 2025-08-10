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
    try {
        console.log("callbackUrl", callbackUrl);
        await signIn("google", { redirect: true, redirectTo: callbackUrl })
    } catch (e) {
        console.error("Erro ao fazer login com Google:", e)
        throw e
    }
}

export { actionLoginMagicLink, actionLoginGoogle }