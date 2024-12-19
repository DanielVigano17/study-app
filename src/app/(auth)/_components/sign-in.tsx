"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import actionLogin from "../login/actions"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

export function AuthForm() {
  const form = useForm();
  const { toast } = useToast()

  const handleSubmit = form.handleSubmit(async (data) =>{
    await actionLogin(data.email);
    
    toast({
      title: "Link Enviado",
      description: "O link para acesso foi enviado para o seu email",
      action : <ToastAction altText="Ok">Ok</ToastAction>,
    });

  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Digite seu email para receber o link de login</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} action='#' method="post">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...form.register("email")} type="email" placeholder="você@example.com" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
              {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
              Enviar Magic Link
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}