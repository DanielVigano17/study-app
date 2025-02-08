import { Suspense } from "react";
import { FlashCardDeck } from "./_components/FlashCardDeck";
import { modules } from "@/domain";

export default async function PageFlashCards({params} : {params : Promise<{materiaId : string}>}) {
    const materiaId = (await params).materiaId;

    const flashcards = await modules.useCase.pergunta.findMany.execute(materiaId);
    console.log(flashcards)
    return (
        <div className="container mx-auto py-8 px-8 h-screen overflow-y-auto">
            <Suspense fallback={<p>Carregando...</p>}>
                {flashcards && <FlashCardDeck cards={flashcards} />}
                {!flashcards && <p>Nenhum flashcard cadastrado</p>}
            </Suspense>
        </div>
    )
}

