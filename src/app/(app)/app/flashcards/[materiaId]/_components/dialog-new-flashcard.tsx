"use client"

import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Plus, X, Wand2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { createFlashcardAction } from "../../../actions"
import { ApplicationContext } from "@/app/_context/app.context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type FormValues = {
  acao: string
  resposta: string
  badge: string
}

export function FlashcardDialog({materiaId} : {materiaId : string}) {
  const [badges, setBadges] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const {session} = useContext(ApplicationContext);

  const form = useForm<FormValues>({
    defaultValues: {
      acao: "",
      resposta: "",
      badge: "",
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      const {acao, resposta} = values;
      const result = await createFlashcardAction(
        {acao, resposta, materiaId}, 
        session?.user?.id!, 
        session?.user?.subscriptionId!
      );

      if (result.error) {
        setError(result.error.message);
        toast({
          variant: "destructive",
          title: "Limite Atingido",
          description: result.error.message,
        });
        return;
      }

      setOpen(false);
      form.reset();
      setBadges([]);
      setError(null);
      toast({
        variant: "default",
        title: "Sucesso",
        description: "Flashcard criado com sucesso!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao criar flashcard",
      });
    }
  }

  function addBadge() {
    const badge = form.getValues("badge")
    if (badge && !badges.includes(badge)) {
      setBadges([...badges, badge])
      form.setValue("badge", "", { shouldValidate: true })
    }
  }

  function removeBadge(badge: string) {
    setBadges(badges.filter((b) => b !== badge))
  }

  async function generateWithAI() {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const generatedQuestion = "Qual é a capital da França?"
    const generatedAnswer = "A capital da França é Paris."

    form.setValue("acao", generatedQuestion, { shouldValidate: true })
    form.setValue("resposta", generatedAnswer, { shouldValidate: true })
    setIsGenerating(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          <p className="hidden md:flex">Adicionar Flashcard</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Flashcard</DialogTitle>
          <DialogDescription>Adicione uma nova pergunta e resposta ao seu conjunto de flashcards.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-between items-center">
              <FormLabel className="font-semibold">Pergunta</FormLabel>
            </div>
            <FormField
              control={form.control}
              name="acao"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Digite a pergunta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resposta"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Digite a resposta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="badge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Badges</FormLabel>
                  <div className="flex space-x-2">
                    <FormControl>
                      <Input placeholder="Adicionar badge" {...field} />
                    </FormControl>
                    <Button type="button" size="icon" onClick={addBadge}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <Badge key={badge} variant="secondary">
                  {badge}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-2 p-0"
                    onClick={() => removeBadge(badge)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <DialogFooter>
              <div className="flex flex-col w-full gap-4">
                <Button type="button" variant="outline" size="lg" onClick={generateWithAI} disabled={isGenerating}>
                    {isGenerating ? (
                    "Gerando..."
                    ) : (
                    <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Gerar com IA
                    </>
                    )}
                </Button>
                <Button size="lg" type="submit">Salvar</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

