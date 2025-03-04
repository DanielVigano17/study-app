"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Home } from "lucide-react"

interface Option {
  id: string
  text: string
  correct?: boolean
}

interface Question {
  id: string
  question: string
  options: Option[]
}

interface QuizFormProps {
  subjectId: string
  onBackToGenerator: () => void
  questions: Question[]
}

export function QuizForm({ subjectId, onBackToGenerator, questions }: QuizFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [direction, setDirection] = useState(1) // 1 para avançar, -1 para voltar
  const [completed, setCompleted] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length
  const progress = (currentQuestionIndex / totalQuestions) * 100

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setDirection(1)
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setCompleted(true)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1)
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setCompleted(false)
    setDirection(1)
  }

  // Tela de conclusão com resultados
  if (completed) {
    const correctAnswers = questions.filter((q) => {
      const userAnswer = answers[q.id]
      const correctOption = q.options.find((opt: Option) => opt.correct)
      return userAnswer === correctOption?.id
    }).length

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Formulário Concluído!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
          </motion.div>
          <p className="text-center mb-2">Obrigado por responder todas as perguntas!</p>
          <p className="text-center font-bold text-xl mb-6">
            Você acertou {correctAnswers} de {questions.length} perguntas!
          </p>
          <div className="w-full px-2 h-52 overflow-auto">
                <div className="space-y-4 w-full">
                    {questions.map((q) => {
                    const userAnswer = answers[q.id]
                    const correctOption = q.options.find((opt: Option) => opt.correct)
                    const isCorrect = userAnswer === correctOption?.id

                    return (
                        <div
                        key={q.id}
                        className={`p-4 border rounded-lg ${
                            isCorrect ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
                        }`}
                        >
                        <p className="font-medium">{q.question}</p>
                        <div className="mt-2">
                            <p>Sua resposta: {q.options.find((opt: Option) => opt.id === userAnswer)?.text}</p>
                            {!isCorrect && (
                            <p className="text-green-700 font-medium mt-1">Resposta correta: {correctOption?.text}</p>
                            )}
                        </div>
                        <div className="mt-2 flex items-center">
                            {isCorrect ? (
                            <span className="text-green-700 font-medium flex items-center">
                                <CheckCircle className="w-5 h-5 mr-1" /> Correto
                            </span>
                            ) : (
                            <span className="text-red-700 font-medium flex items-center">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-1"
                                >
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                                </svg>
                                Incorreto
                            </span>
                            )}
                        </div>
                        </div>
                    )
                    })}
                </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button onClick={resetQuiz} variant="outline" className="w-full">
            Tentar Novamente
          </Button>
          <Button onClick={onBackToGenerator} className="w-full">
            <Home className="w-4 h-4 mr-2" /> Voltar para Gerador
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
          <div
            className="bg-primary h-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <CardTitle className="text-center">
          Pergunta {currentQuestionIndex + 1} de {totalQuestions}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentQuestionIndex}
            initial={{
              x: direction > 0 ? 100 : -100,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: direction > 0 ? -100 : 100,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="w-full"
          >
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
            <RadioGroup value={answers[currentQuestion.id] || ""} onValueChange={handleAnswer} className="space-y-3">
              {currentQuestion.options.map((option: Option) => (
                <div
                  key={option.id}
                  className={`flex items-center space-x-2 border p-4 rounded-lg transition-colors hover:bg-gray-50 ${
                    answers[currentQuestion.id] === option.id ? "border-primary bg-primary/5" : "border-gray-200"
                  }`}
                >
                  <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                  <Label htmlFor={`option-${option.id}`} className="flex-grow cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
          Anterior
        </Button>
        <Button onClick={goToNextQuestion} disabled={!answers[currentQuestion.id]}>
          {currentQuestionIndex === totalQuestions - 1 ? "Concluir" : "Próxima"}
        </Button>
      </CardFooter>
    </Card>
  )
}

