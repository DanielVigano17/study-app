import { Card, CardContent } from "@/components/ui/card"
import styles from './flashcard.module.css'

interface FlashCardProps {
  front: string
  back: string
  isFlipped: boolean
  onClick: () => void
}

export function FlashCard({ front, back, isFlipped, onClick }: FlashCardProps) {
  return (
    <div 
      className={`${styles.flashcard} w-full max-w-md h-64 cursor-pointer`}
      onClick={onClick}
    >
      <div className={`${styles.flashcardInner} ${isFlipped ? styles.isFlipped : ''}`}>
        <div className={`${styles.flashcardFront} absolute w-full h-full flex items-center justify-center p-6`}>
          <p className="text-2xl font-semibold text-center overflow-auto max-h-full break-words">{front}</p>
        </div>
        <div className={`${styles.flashcardBack} absolute w-full h-full flex items-center justify-center p-6`}>
          <p className="text-2xl font-semibold text-center overflow-auto max-h-full break-words whitespace-pre-line">{back}</p>
        </div>
      </div>
    </div>
  )
}

