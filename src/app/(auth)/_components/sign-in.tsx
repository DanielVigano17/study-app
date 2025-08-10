"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { actionLoginGoogle, actionLoginMagicLink } from "../login/actions"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import ParallaxBackground from "@/components/backgrounds/parallax-background"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

interface AuthFormProps {
  redirectTo?: string
}

export function AuthForm({ redirectTo = "/app/billing" }: AuthFormProps) {
  const googleForm = useForm();
  const magicLinkForm = useForm();
  const { toast } = useToast()

  const handleSubmitGoogle = googleForm.handleSubmit(async () => {
    try {
      await actionLoginGoogle(redirectTo);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao fazer login com Google",
        action: <ToastAction altText="Tentar novamente">Tentar novamente</ToastAction>,
      });
    }
  })

  const handleSubmitMagicLink = magicLinkForm.handleSubmit(async (data) => {
    try {
      await actionLoginMagicLink(data.email);
      toast({
        title: "Link Enviado",
        description: "Verifique seu e-mail e, ao acessar pelo link, você será redirecionado.",
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao enviar link de acesso",
        action: <ToastAction altText="Tentar novamente">Tentar novamente</ToastAction>,
      });
    }
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ParallaxBackground dotColor="#d1d1d1" dotSize={2} dotCount={200} speed={0.15} />
      <Card className="w-full mx-3 z-40 max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Bem-vindo ao SmartStudy</CardTitle>
          <CardDescription className="text-center">Faça login para continuar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
        <form onSubmit={handleSubmitMagicLink} action='#' method="post" className="space-y-4">
            <div className="space-y-2">
              <Input 
                id="email" 
                {...magicLinkForm.register("email")} 
                type="email" 
                placeholder="você@example.com" 
                required 
              />
            </div>
            <Button 
              type="submit" 
              disabled={magicLinkForm.formState.isSubmitting} 
              className="w-full"
            >
              {magicLinkForm.formState.isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Enviar Link de Acesso"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Ou
              </span>
            </div>
          </div>
          
          <form onSubmit={handleSubmitGoogle} action='#' method="post">
            <Button 
              type="submit" 
              disabled={googleForm.formState.isSubmitting} 
              className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-gray-100 border border-gray-300"
            >
              {googleForm.formState.isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Image 
                    src="/google.svg" 
                    alt="Google" 
                    width={20} 
                    height={20}
                  />
                  Continuar com Google
                </>
              )}
            </Button>
          </form>

        </CardContent>
      </Card>
    </div>
  )
}