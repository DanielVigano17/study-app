import { signIn } from "@/auth"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Digite seu email para receber o link de login</CardDescription>
        </CardHeader>
        <form action={async (formData) => {
        "use server"
        await signIn("resend", {email : formData.get("email"), redirectTo : "/app"})
      }}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="você@example.com" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Enviar Magic Link</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}