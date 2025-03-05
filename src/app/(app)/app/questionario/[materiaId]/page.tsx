import { Button } from "@/components/ui/button"
import { Plus, Play, FileText, MoveLeft } from 'lucide-react'
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { modules } from "@/domain"

export default async function QuestionariosPage({params} : {params : Promise<{materiaId : string}>}) {
  const materiaId = (await params).materiaId;
  
  const questionarios = await modules.useCase.questionario.list.execute(materiaId);

  return (
    <div className="w-full overflow-y-auto">
      <div className="container mx-auto h-screen px-4 py-8 overflow-y-visible">
        <div className="flex items-start mb-4 md:flex-row md:items-center justify-between md:mb-8">
          <div className="flex items-center gap-4">
            <Link href={`/app/`}><MoveLeft className="w-5 h-5 mb-2 md:mb-0"/></Link>
            <h1 className="text-2xl font-semibold mb-2 md:mb-0">Questionários</h1>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link href={`/quiz`}>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                <p className="hidden md:flex">Novo Questionário</p>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-8 overflow-x-auto">
          <Link href={`/app/fileList/${materiaId}`}>
            <Button variant="ghost" className="text-sm text-gray-500 whitespace-nowrap">
              <FileText className="w-4 h-4 mr-2" />
              Arquivos
            </Button>
          </Link>
          <Link href={`/app/flashcards/${materiaId}`}>
            <Button variant="ghost" className="text-sm text-gray-500 whitespace-nowrap">
                <FileText className="w-4 h-4 mr-2" />
                FLASHCARDS
            </Button>
          </Link>
          <Button variant="ghost" className="text-sm bg-secondary whitespace-nowrap">
            QUESTIONÁRIOS
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {questionarios.map((questionario) => (
            <Card key={questionario.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Questionário {questionario.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Última revisão: {questionario.dtUltimaRevisao ? new Date(questionario.dtUltimaRevisao).toLocaleDateString() : 'Nunca'}
                </p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Play className="w-4 h-4" />
                    Iniciar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
