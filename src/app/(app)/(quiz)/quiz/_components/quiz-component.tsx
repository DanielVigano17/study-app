"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { QuizGenerator } from "./quiz-generator"
import { QuizForm } from "./quiz-form"

// Definição das matérias disponíveis
export const subjects = [
  {
    id: "geografia",
    name: "Geografia",
    description: "Teste seus conhecimentos sobre países, capitais e geografia mundial.",
  },
  {
    id: "ciencias",
    name: "Ciências",
    description: "Perguntas sobre biologia, química e física para testar seu conhecimento científico.",
  },
  {
    id: "matematica",
    name: "Matemática",
    description: "Desafie-se com questões de matemática, álgebra e geometria.",
  },
  {
    id: "historia",
    name: "História",
    description: "Teste seus conhecimentos sobre eventos históricos importantes.",
  },
  {
    id: "conhecimentos-gerais",
    name: "Conhecimentos Gerais",
    description: "Um mix de perguntas sobre diversos assuntos para testar sua cultura geral.",
  },
]

export function QuizApp() {
  const [generatedQuestions, setGeneratedQuestions] = useState<any[] | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const handleQuestionsGenerated = (questions: any[], subjectId: string) => {
    setGeneratedQuestions(questions)
    setSelectedSubject(subjectId)
    setIsGenerating(false)
  }

  const handleStartGenerating = () => {
    setIsGenerating(true)
  }

  const handleBackToGenerator = () => {
    setGeneratedQuestions(null)
    setSelectedSubject(null)
  }

  return (
    <div className="container max-h-screen overflow-y-auto mx-auto py-8 px-4">
      <AnimatePresence mode="wait">
        {generatedQuestions ? (
          // Tela do formulário de perguntas gerado
          <motion.div
            key="quiz-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6 flex items-center">
              <Button variant="ghost" size="sm" onClick={handleBackToGenerator} className="flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Voltar para Gerador
              </Button>
            </div>
            <QuizForm
              subjectId={selectedSubject || ""}
              onBackToGenerator={handleBackToGenerator}
              questions={generatedQuestions}
            />
          </motion.div>
        ) : (
          // Tela de geração de perguntas com IA
          <motion.div
            key="quiz-generator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold text-center mb-8">Gerador de Questionário com IA</h1>
            <QuizGenerator
              onQuestionsGenerated={handleQuestionsGenerated}
              isGenerating={isGenerating}
              onStartGenerating={handleStartGenerating}
              subjects={subjects}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

