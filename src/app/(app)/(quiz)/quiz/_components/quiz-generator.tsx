"use client"

import { useState } from "react"
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

// Função que simula a geração de perguntas com IA
const generateQuestionsWithAI = async (
  description: string,
  subject: string,
  difficulty: number,
  numberOfQuestions: number,
) => {
  // // Esta é uma simulação - em um ambiente real, você faria uma chamada para uma API de IA
  // return new Promise<any[]>((resolve) => {
  //   setTimeout(() => {
  //     // Gera perguntas baseadas na matéria
  //     const questions = []

  //     if (subject === "geografia") {
  //       questions.push(
  //         {
  //           id: 1,
  //           question: "Qual é a capital da Austrália?",
  //           options: [
  //             { id: "a", text: "Sydney" },
  //             { id: "b", text: "Melbourne" },
  //             { id: "c", text: "Canberra", correct: true },
  //             { id: "d", text: "Perth" },
  //           ],
  //         },
  //         {
  //           id: 2,
  //           question: "Qual é o maior deserto do mundo?",
  //           options: [
  //             { id: "a", text: "Deserto do Saara", correct: true },
  //             { id: "b", text: "Deserto de Gobi" },
  //             { id: "c", text: "Deserto da Arábia" },
  //             { id: "d", text: "Deserto de Kalahari" },
  //           ],
  //         },
  //         {
  //           id: 3,
  //           question: "Qual é o país com mais ilhas no mundo?",
  //           options: [
  //             { id: "a", text: "Filipinas" },
  //             { id: "b", text: "Indonésia" },
  //             { id: "c", text: "Japão" },
  //             { id: "d", text: "Suécia", correct: true },
  //           ],
  //         },
  //         {
  //           id: 4,
  //           question: "Qual é o ponto mais alto da Terra?",
  //           options: [
  //             { id: "a", text: "Monte Everest", correct: true },
  //             { id: "b", text: "Monte K2" },
  //             { id: "c", text: "Monte Kilimanjaro" },
  //             { id: "d", text: "Monte Aconcágua" },
  //           ],
  //         },
  //         {
  //           id: 5,
  //           question: "Qual é o maior arquipélago do mundo?",
  //           options: [
  //             { id: "a", text: "Filipinas" },
  //             { id: "b", text: "Indonésia", correct: true },
  //             { id: "c", text: "Maldivas" },
  //             { id: "d", text: "Havaí" },
  //           ],
  //         },
  //       )
  //     } else if (subject === "matematica") {
  //       questions.push(
  //         {
  //           id: 1,
  //           question: "Qual é o valor de π (pi) arredondado para cinco casas decimais?",
  //           options: [
  //             { id: "a", text: "3,14159", correct: true },
  //             { id: "b", text: "3,14169" },
  //             { id: "c", text: "3,14195" },
  //             { id: "d", text: "3,14149" },
  //           ],
  //         },
  //         {
  //           id: 2,
  //           question: "Qual é o resultado de 2³ × 5²?",
  //           options: [
  //             { id: "a", text: "100" },
  //             { id: "b", text: "125" },
  //             { id: "c", text: "200", correct: true },
  //             { id: "d", text: "225" },
  //           ],
  //         },
  //         {
  //           id: 3,
  //           question: "Em um triângulo equilátero, quanto medem os ângulos internos?",
  //           options: [
  //             { id: "a", text: "45 graus" },
  //             { id: "b", text: "60 graus", correct: true },
  //             { id: "c", text: "90 graus" },
  //             { id: "d", text: "120 graus" },
  //           ],
  //         },
  //         {
  //           id: 4,
  //           question: "Qual é a fórmula para calcular a área de um círculo?",
  //           options: [
  //             { id: "a", text: "A = 2πr" },
  //             { id: "b", text: "A = πr²", correct: true },
  //             { id: "c", text: "A = πd" },
  //             { id: "d", text: "A = 2πr²" },
  //           ],
  //         },
  //         {
  //           id: 5,
  //           question: "Se 3x + 7 = 22, qual é o valor de x?",
  //           options: [
  //             { id: "a", text: "3" },
  //             { id: "b", text: "5", correct: true },
  //             { id: "c", text: "7" },
  //             { id: "d", text: "15" },
  //           ],
  //         },
  //       )
  //     } else if (subject === "ciencias") {
  //       questions.push(
  //         {
  //           id: 1,
  //           question: "Qual é o símbolo químico do ouro?",
  //           options: [
  //             { id: "a", text: "Ag" },
  //             { id: "b", text: "Au", correct: true },
  //             { id: "c", text: "Fe" },
  //             { id: "d", text: "Cu" },
  //           ],
  //         },
  //         {
  //           id: 2,
  //           question: "Qual é a menor partícula de um elemento que mantém suas propriedades químicas?",
  //           options: [
  //             { id: "a", text: "Átomo", correct: true },
  //             { id: "b", text: "Elétron" },
  //             { id: "c", text: "Próton" },
  //             { id: "d", text: "Nêutron" },
  //           ],
  //         },
  //         {
  //           id: 3,
  //           question: "Qual é o processo pelo qual as plantas convertem luz solar em energia?",
  //           options: [
  //             { id: "a", text: "Fotossíntese", correct: true },
  //             { id: "b", text: "Respiração" },
  //             { id: "c", text: "Transpiração" },
  //             { id: "d", text: "Fermentação" },
  //           ],
  //         },
  //         {
  //           id: 4,
  //           question: "Qual é a unidade básica de hereditariedade?",
  //           options: [
  //             { id: "a", text: "Célula" },
  //             { id: "b", text: "Cromossomo" },
  //             { id: "c", text: "Gene", correct: true },
  //             { id: "d", text: "DNA" },
  //           ],
  //         },
  //         {
  //           id: 5,
  //           question: "Qual é a velocidade aproximada da luz no vácuo?",
  //           options: [
  //             { id: "a", text: "300.000 km/s", correct: true },
  //             { id: "b", text: "150.000 km/s" },
  //             { id: "c", text: "500.000 km/s" },
  //             { id: "d", text: "1.000.000 km/s" },
  //           ],
  //         },
  //       )
  //     } else if (subject === "historia") {
  //       questions.push(
  //         {
  //           id: 1,
  //           question: "Em que ano começou a Segunda Guerra Mundial?",
  //           options: [
  //             { id: "a", text: "1935" },
  //             { id: "b", text: "1939", correct: true },
  //             { id: "c", text: "1941" },
  //             { id: "d", text: "1945" },
  //           ],
  //         },
  //         {
  //           id: 2,
  //           question: "Quem foi o primeiro imperador do Brasil?",
  //           options: [
  //             { id: "a", text: "Dom Pedro I", correct: true },
  //             { id: "b", text: "Dom Pedro II" },
  //             { id: "c", text: "Dom João VI" },
  //             { id: "d", text: "Princesa Isabel" },
  //           ],
  //         },
  //         {
  //           id: 3,
  //           question: "Qual evento marcou o início da Idade Moderna?",
  //           options: [
  //             { id: "a", text: "Queda do Império Romano" },
  //             { id: "b", text: "Revolução Francesa" },
  //             { id: "c", text: "Queda de Constantinopla", correct: true },
  //             { id: "d", text: "Descobrimento da América" },
  //           ],
  //         },
  //         {
  //           id: 4,
  //           question: "Quem foi o líder da Revolução Russa de 1917?",
  //           options: [
  //             { id: "a", text: "Josef Stalin" },
  //             { id: "b", text: "Vladimir Lenin", correct: true },
  //             { id: "c", text: "Leon Trotsky" },
  //             { id: "d", text: "Nicolau II" },
  //           ],
  //         },
  //         {
  //           id: 5,
  //           question: "Qual foi o período da Ditadura Militar no Brasil?",
  //           options: [
  //             { id: "a", text: "1954-1985" },
  //             { id: "b", text: "1964-1985", correct: true },
  //             { id: "c", text: "1970-1990" },
  //             { id: "d", text: "1960-1975" },
  //           ],
  //         },
  //       )
  //     } else {
  //       // Conhecimentos gerais ou outras matérias
  //       questions.push(
  //         {
  //           id: 1,
  //           question: "Qual é o instrumento musical que tem 88 teclas?",
  //           options: [
  //             { id: "a", text: "Órgão" },
  //             { id: "b", text: "Piano", correct: true },
  //             { id: "c", text: "Acordeão" },
  //             { id: "d", text: "Sintetizador" },
  //           ],
  //         },
  //         {
  //           id: 2,
  //           question: "Qual é o livro mais vendido no mundo depois da Bíblia?",
  //           options: [
  //             { id: "a", text: "Dom Quixote", correct: true },
  //             { id: "b", text: "O Pequeno Príncipe" },
  //             { id: "c", text: "Harry Potter" },
  //             { id: "d", text: "O Senhor dos Anéis" },
  //           ],
  //         },
  //         {
  //           id: 3,
  //           question: "Qual é o esporte mais popular do mundo?",
  //           options: [
  //             { id: "a", text: "Basquete" },
  //             { id: "b", text: "Vôlei" },
  //             { id: "c", text: "Futebol", correct: true },
  //             { id: "d", text: "Tênis" },
  //           ],
  //         },
  //         {
  //           id: 4,
  //           question: "Qual é o maior mamífero terrestre?",
  //           options: [
  //             { id: "a", text: "Elefante africano", correct: true },
  //             { id: "b", text: "Rinoceronte" },
  //             { id: "c", text: "Hipopótamo" },
  //             { id: "d", text: "Girafa" },
  //           ],
  //         },
  //         {
  //           id: 5,
  //           question: "Qual é a maior glândula do corpo humano?",
  //           options: [
  //             { id: "a", text: "Pâncreas" },
  //             { id: "b", text: "Fígado", correct: true },
  //             { id: "c", text: "Tireoide" },
  //             { id: "d", text: "Hipófise" },
  //           ],
  //         },
  //       )
  //     }

  //     // Retorna apenas o número de perguntas solicitado
  //     resolve(questions.slice(0, numberOfQuestions))
  //   }, 3000) // Simula um atraso de 3 segundos para a "geração" das perguntas
  // })

  const perguntasGeradas = await createPerguntasAction(description);
  console.log("Passei: ",perguntasGeradas.questions);
  return perguntasGeradas.questions;
}

interface QuizGeneratorProps {
  onQuestionsGenerated: (questions: any[], subjectId: string) => void
  isGenerating: boolean
  onStartGenerating: () => void
  subjects: Materia[]
}

export function QuizGenerator({ onQuestionsGenerated, isGenerating, onStartGenerating, subjects }: QuizGeneratorProps) {
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState([2]) // Escala de 1-5
  const [numberOfQuestions, setNumberQuestions] = useState([5]) // Padrão: 5 perguntas
  const [selectedSubject, setSelectedSubject] = useState("")

  const handleGenerateQuestions = async () => {
    if (!selectedSubject) return

    onStartGenerating()

    try {
      const questions = await generateQuestionsWithAI(description, selectedSubject, difficulty[0], numberOfQuestions[0])

      onQuestionsGenerated(questions, selectedSubject)
    } catch (error) {
      console.error("Erro ao gerar perguntas:", error)
      // Aqui você poderia mostrar uma mensagem de erro para o usuário
    }
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

  const selectedSubjectName = subjects.find((s) => s.id === selectedSubject)?.titulo || ""

  return (
    <Card className="w-full max-w-2xl mx-auto h-full">
      <CardHeader>
        <CardTitle className="text-center">Gerar Questionário com IA</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="subject">Matéria:</Label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger id="subject">
              <SelectValue placeholder="Selecione uma matéria" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.titulo}
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
              selectedSubjectName
                ? `Ex: Quero perguntas sobre ${selectedSubjectName.toLowerCase()} focadas em assuntos do ensino médio, com ênfase em conceitos básicos.`
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
          disabled={isGenerating || description.trim().length < 10 || !selectedSubject}
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

