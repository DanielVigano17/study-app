"use server"
import { signIn } from "@/auth"

const actionLogin = async (email : String) => {
        try{
            await signIn("resend", {email : email,redirectTo:"/app", redirect: false})
        }
        catch(e){
            console.log(e)
        }
}

export default actionLogin
