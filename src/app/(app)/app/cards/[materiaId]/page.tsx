import { Suspense } from "react";
import { FlashCardDeck } from "./_components/FlashCardDeck";
import { modules } from "@/domain";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { ApplicationPage } from "@/components/page-content/ApplicationPage";


export default async function PageFlashCards({params} : {params : Promise<{materiaId : string}>}) {
    const materiaId = (await params).materiaId;

    const flashcards = await modules.useCase.flashcard.findflashcardRevisao.execute(materiaId);
    const materia = await modules.useCase.materia.findMateria.execute(materiaId);

    return (
        <ApplicationPage pageKey="flashcards-page">
            <Suspense fallback={<p>Carregando...</p>}>
                <div className="flex items-center gap-4">
                    <Link href={`/app/flashcards/${materiaId}`}><MoveLeft className="w-5 h-5"/></Link >
                    {materia && <h1 className="text-2xl font-semibold">{materia.titulo}</h1>}
                </div>
                {flashcards && <FlashCardDeck cards={flashcards} />}
                {!flashcards && <p className="text-center mt-24">Nenhum flashcard para ser revisado</p>}
            </Suspense>
        </ApplicationPage>
    )
}

