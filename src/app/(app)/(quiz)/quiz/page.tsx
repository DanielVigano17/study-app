import React from 'react'
import { QuizApp } from './_components/quiz-component'
import { ApplicationPage } from '@/components/page-content/ApplicationPage'

const QuizPage = () => {
  return (
    <ApplicationPage pageKey="quiz-page" authPage>
      <QuizApp/>
    </ApplicationPage>
  )
}

export default QuizPage
