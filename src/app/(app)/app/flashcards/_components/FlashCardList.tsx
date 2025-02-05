"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pergunta } from '@/domain/entities/Pergunta'
import { findManyPerguntasAction } from '../../actions'

// interface Flashcard {
//   id: string
//   title: string
//   question: string
//   answer: string
// }

// const flashcards: Flashcard[] = [
//   {
//     id: "1",
//     title: "React Hooks",
//     question: "What is useState?",
//     answer: "useState is a Hook that lets you add React state to function components."
//   },
//   {
//     id: "2",
//     title: "JavaScript Basics",
//     question: "What is closure?",
//     answer: "A closure is the combination of a function bundled together with references to its surrounding state."
//   },
//   {
//     id: "3",
//     title: "CSS Fundamentals",
//     question: "What is the box model?",
//     answer: "The CSS box model is essentially a box that wraps around every HTML element consisting of margins, borders, padding, and the actual content."
//   }
// ]

export function FlashcardList({materiaId} : {materiaId : string}) {
  const [visibleAnswers, setVisibleAnswers] = useState<{ [key: string]: boolean }>({})
  const [flashCards, setFlashCards] = useState<Pergunta[]>([])

  useEffect(()=>{
    async function getFlashCards(){
      const lista = await findManyPerguntasAction(materiaId);
      setFlashCards(lista);
    }
    getFlashCards();
  },[])

  const handleDelete = (id: string) => {
    console.log('Delete flashcard:', id)
  }

  const handleEdit = (id: string) => {
    console.log('Edit flashcard:', id)
  }

  const toggleAnswerVisibility = (id: string) => {
    setVisibleAnswers(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {flashCards.map((flashcard) => (
        <Card key={flashcard.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              {/* <Badge variant="secondary">{flashcard.title}</Badge> */}
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(flashcard.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the
                        flashcard.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(flashcard.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <CardDescription>Click the eye icon to reveal answer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <strong>Question:</strong>
                <p className="mt-1 text-muted-foreground">{flashcard.acao}</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <strong>Answer:</strong>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleAnswerVisibility(flashcard.id)}
                  >
                    {visibleAnswers[flashcard.id] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className={`mt-1 text-muted-foreground transition-all duration-300 ${visibleAnswers[flashcard.id] ? '' : 'blur-sm'}`}>
                  {flashcard.resposta}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

