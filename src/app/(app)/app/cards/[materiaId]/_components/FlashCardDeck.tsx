'use client'

import { useState } from 'react'
import { FlashCard } from './FlashCard'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Flashcard } from '@/domain/entities/Flashcard'
import { calcularProximaRevisao } from '@/lib/utils'

interface FlashCardDeckProps {
  cards: Flashcard[]
}

export function FlashCardDeck({ cards: initialCards }: FlashCardDeckProps) {
  const [cards, setCards] = useState(initialCards)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showingAnswer, setShowingAnswer] = useState(false)

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length)
    setShowingAnswer(false)
  }

  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length)
    setShowingAnswer(false)
  }

  const flipCard = () => {
    setShowingAnswer(!showingAnswer)
  }

  const rateDifficulty = async (difficulty: 9 | 6 | 2) => {
    await calcularProximaRevisao(cards[currentCardIndex], difficulty);
    
    setCards((prevCards) => 
      prevCards.map((card, index) => 
        index === currentCardIndex ? { ...card, difficulty } : card
      )
    )
    goToNextCard()
  }

  return (
    <div className="flex flex-col h-screen mt-12 md:mt-24 items-center space-y-4">
      <FlashCard 
        front={cards[currentCardIndex].acao} 
        back={cards[currentCardIndex].resposta}
        isFlipped={showingAnswer}
        onClick={flipCard}
      />
      <div className="flex space-x-4">
        <Button onClick={goToPreviousCard} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
        </Button>
        <Button onClick={goToNextCard} variant="outline">
          Próximo <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      {showingAnswer && (
        <div className="flex space-x-2">
          <Button onClick={() => rateDifficulty(9)} variant="secondary" className="bg-green-500 hover:bg-green-600 text-white">
            Fácil
          </Button>
          <Button onClick={() => rateDifficulty(6)} variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Médio
          </Button>
          <Button onClick={() => rateDifficulty(2)} variant="secondary" className="bg-red-500 hover:bg-red-600 text-white">
            Díficil
          </Button>
        </div>
      )}
      <p className="text-sm text-muted-foreground">
        Card {currentCardIndex + 1} de {cards.length}
      </p>
    </div>
  )
}

