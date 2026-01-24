import { ApplicationPage } from "@/components/page-content/ApplicationPage"
import { FlashcardsPageContent } from "./_components/flashcards-page-content"

export default async function FlashcardsPage({ params }: { params: Promise<{ materiaId: string }> }) {
  const materiaId = (await params).materiaId

  return (
    <ApplicationPage pageKey="flashcards-page" authPage>
      <FlashcardsPageContent materiaId={materiaId} />
    </ApplicationPage>
  )
}

