import React from 'react'
import { QuizApp } from './_components/quiz-component'
import { AnimatedPage } from "@/components/ui/animated-page"

const QuizPage = () => {
  return (
    <AnimatedPage pageKey="quiz-page">
      <div className='overflow-y-auto flex items-center justify-center'>
          <QuizApp/>
      </div>
    </AnimatedPage>
  )
}

export default QuizPage
