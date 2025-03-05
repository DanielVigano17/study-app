import { Button } from "@/components/ui/button"
import { FlashcardList } from "../_components/FlashCardList"
import { Plus, Play, FileText, MoveLeft } from 'lucide-react'
import Link from "next/link"
import { FlashcardDialog } from "./_components/dialog-new-flashcard";

export default async function FlashcardsPage({params} : {params : Promise<{materiaId : string}>}) {
  const materiaId = (await params).materiaId;

  return (
      <div className="w-full overflow-y-auto">
        <div className="container mx-auto h-screen px-4 py-8 overflow-y-visible">
          <div className="flex items-start mb-4 md:flex-row md:items-center justify-between md:mb-8">
          <div className="flex items-center gap-4">
            <Link href={`/app/`}><MoveLeft className="w-5 h-5 mb-2 md:mb-0"/></Link >
            <h1 className="text-2xl font-semibold mb-2 md:mb-0">Flashcards</h1>
          </div>
            <div className="flex gap-4 flex-wrap">
              <Link href={`/app/cards/${materiaId}`}>
                <Button variant="outline" className="gap-2">
                  <Play className="w-4 h-4" />
                  <p className="hidden md:flex">Começar a Revisar</p>
                </Button>
              </Link>
              <FlashcardDialog materiaId={materiaId}/>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-8 overflow-x-auto">
            <Link href={`/app/fileList/${materiaId}`}>
              <Button variant="ghost" className="text-sm text-gray-500 whitespace-nowrap">
                <FileText className="w-4 h-4 mr-2" />
                Arquivos
              </Button>
            </Link>
            <Button variant="ghost" className="text-sm bg-secondary whitespace-nowrap">
              FLASHCARDS
            </Button>
            <Link href={`/app/questionario/${materiaId}`}>
              <Button variant="ghost" className="text-sm text-gray-500 whitespace-nowrap">
                <FileText className="w-4 h-4 mr-2" />
                QUESTIONÁRIOS
              </Button>
            </Link>
          </div>
          <FlashcardList materiaId={materiaId}/>
        </div>
      </div>
  )
}

