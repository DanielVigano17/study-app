"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import actionSalvarNome from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type MyComponentProps = {
    id : string | undefined
};

const UpdateUserForm = ({id} : MyComponentProps) => {
    const form = useForm();
    const router = useRouter();
  
    const handleSubmit = form.handleSubmit(async (data) =>{
      const response = await actionSalvarNome(id, data.nome);

      if(response.success) {
        router.push("/app");
      } else {
        toast.error(response.error);
      }
    });
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Nome</CardTitle>
            <CardDescription>Insira seu nome de usuário</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} action='#' method="post">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {/* <Label htmlFor="email">Email</Label> */}
                <Input id="nome" {...form.register("nome")} type="text" placeholder="Fulano" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
                Salvar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    )
  }
export default UpdateUserForm
