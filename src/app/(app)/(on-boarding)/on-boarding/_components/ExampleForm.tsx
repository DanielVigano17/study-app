"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ExampleFormProps = {
    onNext?: () => void;
};

const ExampleForm = ({ onNext }: ExampleFormProps) => {
    const form = useForm();

    const handleSubmit = form.handleSubmit(async (data) => {
        // Simular salvamento
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simular sucesso
        toast.success("Dados salvos com sucesso!");
        
        // Avançar para o próximo passo
        if (onNext) {
            onNext();
        }
    });

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Exemplo de Formulário</CardTitle>
                <CardDescription>
                    Este é um exemplo de como criar um formulário que usa a função onNext
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="example">Campo de Exemplo</Label>
                        <Input 
                            id="example" 
                            {...form.register("example", { required: "Campo obrigatório" })} 
                            type="text" 
                            placeholder="Digite algo..." 
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
    );
};

export default ExampleForm;
