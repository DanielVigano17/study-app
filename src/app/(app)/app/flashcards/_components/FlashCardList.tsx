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
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(flashcard.id)}>
                        Deletar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <CardDescription>Clique no ícone de olho pra visualizar a resposta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <strong>Pergunta:</strong>
                <p className="mt-1 text-muted-foreground break-words">{flashcard.acao}</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <strong>Resposta:</strong>
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
                <p className={`mt-1 text-muted-foreground transition-all duration-300 ${visibleAnswers[flashcard.id] ? '' : 'blur-sm'}
                break-words
                `}>
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

