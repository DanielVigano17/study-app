"use client"

import { useContext, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { QuizGenerator } from "./quiz-generator"
import { QuizForm } from "./quiz-form"
import { listMateriasAction } from "@/app/(app)/app/actions"
import { ApplicationContext } from "@/app/_context/app.context"
import { Materia } from "@/domain/entities/Materia"

export function QuizApp() {
  const [generatedQuestions, setGeneratedQuestions] = useState<any[] | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const appContext = useContext(ApplicationContext);

  useEffect(()=>{
    async function getMaterias(){
      const materiasList = await listMateriasAction(appContext.session?.user.id!)
      setMaterias(materiasList);
    }
    
    getMaterias();
  },[])

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
              subjects={materias}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

