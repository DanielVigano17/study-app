"use client"

import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wand2, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Materia } from "@/domain/entities/Materia"
import AiService from "@/services/ai-service"
import { createPerguntasAction } from "@/app/(app)/app/actions"
import { ApplicationContext } from "@/app/_context/app.context"
import { useToast } from "@/hooks/use-toast"

// Função que simula a geração de perguntas com IA
const generateQuestionsWithAI = async (
  description: string,
  materia: string,
  difficulty: number,
  numberOfQuestions: number,
  userId: string,
  subscriptionId: string
) => {
  return await createPerguntasAction(
    description, 
    materia, 
    numberOfQuestions, 
    getDifficultyLabel(difficulty),
    userId,
    subscriptionId
  );
}

const getDifficultyLabel = (value: number) => {
  switch (value) {
    case 1:
      return "Muito Fácil"
    case 2:
      return "Fácil"
    case 3:
      return "Médio"
    case 4:
      return "Difícil"
    case 5:
      return "Muito Difícil"
    default:
      return "Médio"
  }
}

interface QuizGeneratorProps {
  onQuestionsGenerated: (questions: any[], materiaId: string) => void
  isGenerating: boolean
  onStartGenerating: (value: boolean) => void
  materias: Materia[]
}

export function QuizGenerator({ onQuestionsGenerated, isGenerating, onStartGenerating, materias }: QuizGeneratorProps) {
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState([2]) // Escala de 1-5
  const [numberOfQuestions, setNumberQuestions] = useState([5]) // Padrão: 5 perguntas
  const [selectedMateria, setSelectedMateria] = useState("")

  const {session} = useContext(ApplicationContext);
  const { toast } = useToast()

  const handleGenerateQuestions = async () => {
    if (!selectedMateria) return

    onStartGenerating(true)

    try {
      const result = await generateQuestionsWithAI(
        description, 
        selectedMateria, 
        difficulty[0], 
        numberOfQuestions[0], 
        session?.user.id!, 
        session?.user.subscriptionId!
      )

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Limite Atingido",
          description: result.error.message,
        });
        return;
      }

      if (result.questions) {
        onQuestionsGenerated(result.questions, selectedMateria)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao gerar perguntas",
      });
    } finally {
      onStartGenerating(false); // Desativa o estado de loading
    }
  }

  const selectedMateriaName = materias.find((s) => s.id === selectedMateria)?.titulo || ""

  return (
    <Card className="w-full max-w-2xl mx-auto h-full">
      <CardHeader>
        <CardTitle className="text-center">Gerar Questionário com IA</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="materia">Matéria:</Label>
          <Select value={selectedMateria} onValueChange={setSelectedMateria}>
            <SelectTrigger id="materia">
              <SelectValue placeholder="Selecione uma matéria" />
            </SelectTrigger>
            <SelectContent>
              {materias.map((materia) => (
                <SelectItem key={materia.id} value={materia.id}>
                  {materia.titulo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descreva o tipo de perguntas que você deseja:</Label>
          <Textarea
            id="description"
            placeholder={
              selectedMateriaName
                ? `Ex: Quero perguntas sobre ${selectedMateriaName.toLowerCase()} focadas em assuntos do ensino médio, com ênfase em conceitos básicos.`
                : "Descreva o tipo de perguntas que você deseja gerar..."
            }
            className="min-h-[120px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Nível de Dificuldade:</Label>
              <span className="text-sm font-medium">{getDifficultyLabel(difficulty[0])}</span>
            </div>
            <Slider value={difficulty} onValueChange={setDifficulty} max={5} min={1} step={1} />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Muito Fácil</span>
              <span>Muito Difícil</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Número de Perguntas:</Label>
              <span className="text-sm font-medium">{numberOfQuestions[0]}</span>
            </div>
            <Slider value={numberOfQuestions} onValueChange={setNumberQuestions} max={10} min={3} step={1} />
            <div className="flex justify-between text-xs text-gray-500">
              <span>3</span>
              <span>10</span>
            </div>
          </div>
        </div>

        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Loader2 className="h-12 w-12 text-primary" />
            </motion.div>
            <p className="mt-4 text-center text-sm text-gray-500">
              Gerando perguntas com IA... Isso pode levar alguns segundos.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleGenerateQuestions}
          disabled={isGenerating || description.trim().length < 10 || !selectedMateria}
        >
          {isGenerating ? (
            <>Gerando Perguntas...</>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Gerar Perguntas com IA
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

