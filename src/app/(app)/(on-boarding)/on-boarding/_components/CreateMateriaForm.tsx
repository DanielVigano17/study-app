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
    onNext?: (materiaId: string) => void;
};

type FormData = {
    titulo: string;
};

const CreateMateriaForm = ({ userId, onNext }: CreateMateriaFormProps) => {
    const form = useForm<FormData>({
        defaultValues: {
            titulo: ""
        }
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    console.log("CreateMateriaForm rendered with:", { userId });

    const handleSubmit = form.handleSubmit(async (data) => {
        console.log("Form submitted with data:", data);
        console.log("UserId:", userId);
        
        if (!userId) {
            toast.error("ID do usuário não encontrado");
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/materia/create/sem-assinatura', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titulo: data.titulo,
                    userId,
                }),
            });
            
            if (!response.ok) {
                toast.error("Erro ao criar matéria");
                return;
            }

            const { materia } = await response.json();

            if (materia) {
                toast.success("Matéria criada com sucesso!");
                onNext?.(materia.id);
            } else {
                toast.error("Erro inesperado ao criar matéria");
            }
        } catch (error) {
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
