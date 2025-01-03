import { Button } from "@/components/ui/button"
import { FlashcardList } from "./_components/FlashCardList"
import { Plus, Play, FileText } from 'lucide-react'
import Link from "next/link"

export default function FlashcardsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Flashcards</h1>
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2">
            <Play className="w-4 h-4" />
            Começar a Revisar
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Flashcard
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-8">
        <Link href="/app/fileList">
          <Button variant="ghost" className="text-sm text-gray-500">
            <FileText className="w-4 h-4 mr-2" />
            FILES
          </Button>
        </Link>
        <Button variant="ghost" className="text-sm bg-secondary">
          FLASHCARDS
        </Button>
      </div>
      <FlashcardList />
    </div>
  )
}

