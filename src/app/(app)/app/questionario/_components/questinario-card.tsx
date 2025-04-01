"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Trash2 } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { deleteQuestionarioAction } from "@/app/(app)/app/actions"
import { useToast } from "@/hooks/use-toast"
import { Questionario } from "@/domain/entities/Questionario"

interface QuestionarioCardProps {
  questionario: Questionario
}

export function QuestionarioCard({ questionario }: QuestionarioCardProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      const result = await deleteQuestionarioAction(questionario.id)
      
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: result.error.message
        })
        return
      }

      toast({
        title: "Sucesso",
        description: "Questionário excluído com sucesso"
      })
      
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao excluir questionário"
      })
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{questionario.nome}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          Última revisão: {questionario.dtUltimaRevisao ? new Date(questionario.dtUltimaRevisao).toLocaleDateString() : 'Nunca'}
        </p>
        <div className="flex justify-end gap-2">
          <Button 
            variant="destructive" 
            size="sm" 
            className="gap-2"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
            Excluir
          </Button>
          <Link href={`/quiz?questionarioId=${questionario.id}`}>
            <Button variant="outline" size="sm" className="gap-2">
              <Play className="w-4 h-4" />
              Iniciar
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}