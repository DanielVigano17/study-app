"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import actionSalvarNome from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

type MyComponentProps = {
    id : string | undefined
};

const UpdateUserForm = ({id} : MyComponentProps) => {
    const form = useForm();
    const router = useRouter();

    // useEffect(() => {

    //     if(value != 0) sendGTMEvent({ event: 'purchase_success', value: value, currency: "BRL"});

    // }, []);
  
    const handleSubmit = form.handleSubmit(async (data) =>{
      const response = await actionSalvarNome(id, data.nome);

      if(response.success) {
        router.push("/app");
      } else {
        toast.error(response.error);
      }
    });
    
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Informações Pessoais
          </CardTitle>
          <CardDescription>
            Preencha suas informações básicas para personalizar sua experiência
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} action='#' method="post">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="nome" className="text-sm font-medium">Nome Completo</label>
              <Input 
                id="nome" 
                {...form.register("nome")} 
                type="text" 
                placeholder="Digite seu nome completo" 
                required 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting} 
              className="w-full"
            >
              {form.formState.isSubmitting && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              {form.formState.isSubmitting ? "Salvando..." : "Continuar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    )
  }
export default UpdateUserForm
