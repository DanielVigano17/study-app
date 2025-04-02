"use server"
import { signIn } from "@/auth"

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

const actionLoginGoogle = async () => {
    try {
        await signIn("google", { redirect: true })
    } catch (e) {
        console.error("Erro ao fazer login com Google:", e)
        throw e
    }
}

export { actionLoginMagicLink, actionLoginGoogle }