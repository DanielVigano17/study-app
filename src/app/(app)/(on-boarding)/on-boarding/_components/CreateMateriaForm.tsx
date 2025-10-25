"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, BookOpen } from "lucide-react";
import { useForm } from "react-hook-form";
import { novaMateriaAction } from "../../../app/actions";
import { toast } from "sonner";
import { useState } from "react";

type CreateMateriaFormProps = {
    userId: string | undefined;
    subscriptionId: string | undefined | null;
    onNext?: (materiaId: string) => void;
};

type FormData = {
    titulo: string;
};

const CreateMateriaForm = ({ userId, subscriptionId, onNext }: CreateMateriaFormProps) => {
    const form = useForm<FormData>({
        defaultValues: {
            titulo: ""
        }
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    console.log("CreateMateriaForm rendered with:", { userId, subscriptionId });

    const handleSubmit = form.handleSubmit(async (data) => {
        console.log("Form submitted with data:", data);
        console.log("UserId:", userId);
        console.log("SubscriptionId:", subscriptionId);
        
        if (!userId) {
            toast.error("ID do usuário não encontrado");
            return;
        }

        if (!subscriptionId) {
            toast.error("ID da assinatura não encontrado. Verifique se você tem uma assinatura ativa.");
            console.error("SubscriptionId is null or undefined:", subscriptionId);
            return;
        }

        setIsSubmitting(true);
        
        try {
            console.log("Calling novaMateriaAction...");
            console.log("Action parameters:", {
                titulo: data.titulo,
                userId,
                subscriptionId
            });
            
            // Teste direto da API
            console.log("Testing direct API call...");
            const testResponse = await fetch('/api/materia/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titulo: data.titulo,
                    userId,
                    subscriptionId
                }),
            });
            
            console.log("Direct API response status:", testResponse.status);
            const testData = await testResponse.json();
            console.log("Direct API response data:", testData);
            
            const response = await novaMateriaAction(
                { titulo: data.titulo }, 
                userId, 
                subscriptionId
            );

            console.log("Response from novaMateriaAction:", response);

            if (response.error) {
                console.error("Error in response:", response.error);
                toast.error(response.error.message || "Erro ao criar matéria");
                return;
            }

            if (response.materia) {
                console.log("Matéria created successfully:", response.materia);
                toast.success("Matéria criada com sucesso!");
                onNext?.(response.materia.id);
            } else {
                console.log("No matéria in response");
                toast.error("Erro inesperado ao criar matéria");
            }
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            toast.error("Erro ao criar matéria");
        } finally {
            setIsSubmitting(false);
        }
    });

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Criar sua Primeira Matéria
                </CardTitle>
                <CardDescription>
                    Vamos começar criando uma matéria para organizar seus estudos
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="titulo" className="text-sm font-medium">
                            Nome da Matéria
                        </Label>
                        <Input 
                            id="titulo" 
                            {...form.register("titulo", { 
                                required: "Nome da matéria é obrigatório",
                                minLength: {
                                    value: 2,
                                    message: "Nome deve ter pelo menos 2 caracteres"
                                }
                            })} 
                            type="text" 
                            placeholder="Ex: Biologia Celular, História do Brasil..." 
                            required 
                        />
                        {form.formState.errors.titulo && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.titulo.message}
                            </p>
                        )}
                    </div>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full"
                        onClick={() => {
                            console.log("Button clicked!");
                            console.log("Form values:", form.getValues());
                            console.log("Form errors:", form.formState.errors);
                            console.log("Form is valid:", form.formState.isValid);
                        }}
                    >
                        {isSubmitting && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                        {isSubmitting ? "Criando..." : "Criar Matéria"}
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default CreateMateriaForm;
