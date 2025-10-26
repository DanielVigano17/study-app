"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import actionSalvarNome from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

type MyComponentProps = {
    id : string | undefined;
    onNext?: () => void;
};

type FormData = {
    nome: string;
    telefone: string;
};

const UpdateUserForm = ({id, onNext} : MyComponentProps) => {
    const form = useForm<FormData>({
        defaultValues: {
            nome: "",
            telefone: ""
        }
    });
    const router = useRouter();

    // useEffect(() => {

    //     if(value != 0) sendGTMEvent({ event: 'purchase_success', value: value, currency: "BRL"});

    // }, []);
  
    const handleSubmit = form.handleSubmit(async (data) =>{
      const response = await actionSalvarNome(id, data.nome, data.telefone);

      if(response.success) {
        toast.success("Dados salvos com sucesso!");
        // Se tem função onNext, avança para o próximo passo
        if (onNext) {
          onNext();
        } else {
          // Caso contrário, redireciona para /app (comportamento padrão)
          router.push("/app");
        }
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
              <Label htmlFor="nome" className="text-sm font-medium">Nome Completo</Label>
              <Input 
                id="nome" 
                {...form.register("nome", { 
                  required: "Nome é obrigatório",
                  minLength: {
                    value: 2,
                    message: "Nome deve ter pelo menos 2 caracteres"
                  },
                  pattern: {
                    value: /^[a-zA-ZÀ-ÿ\s]+$/,
                    message: "Nome deve conter apenas letras e espaços"
                  }
                })} 
                type="text" 
                placeholder="Digite seu nome completo" 
              />
              {form.formState.errors.nome && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.nome.message}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telefone" className="text-sm font-medium">Telefone</Label>
              <Input 
                id="telefone" 
                {...form.register("telefone", { 
                  required: "Telefone é obrigatório",
                  pattern: {
                    value: /^(\(?[1-9]{2}\)?\s?)?(9\s?)?[0-9]{4,5}[\s\-]?[0-9]{4}$/,
                    message: "Digite um telefone válido (ex: (11) 99999-9999 ou 11999999999)"
                  },
                  minLength: {
                    value: 10,
                    message: "Telefone deve ter pelo menos 10 dígitos"
                  },
                  maxLength: {
                    value: 20,
                    message: "Telefone deve ter no máximo 20 caracteres"
                  }
                })} 
                type="tel" 
                placeholder="Ex: 11 99999-9999" 
              />
              {form.formState.errors.telefone && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.telefone.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting || !form.formState.isValid} 
              className="w-full"
            >
              {form.formState.isSubmitting && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    )
  }
export default UpdateUserForm
