import { Suspense } from "react";
import { FlashCardDeck } from "./_components/FlashCardDeck";
import { modules } from "@/domain";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";


export default async function PageFlashCards({params} : {params : Promise<{materiaId : string}>}) {
    const materiaId = (await params).materiaId;

    const flashcards = await modules.useCase.pergunta.findMany.execute(materiaId);
    const materia = await modules.useCase.materia.findMateria.execute(materiaId);
    console.log(flashcards)
    return (
        <div className="overflow-y-scroll">
           <div className="container mx-auto py-8 px-8 h-screen overflow-y-visible">
            <Suspense fallback={<p>Carregando...</p>}>
                <div className="flex items-center gap-4">
                    <Link href={`/app/flashcards/${materiaId}`}><MoveLeft className="w-5 h-5"/></Link >
                    {materia && <h1 className="text-2xl font-semibold">{materia.titulo}</h1>}
                </div>
                {flashcards && <FlashCardDeck cards={flashcards} />}
                {!flashcards && <p>Nenhum flashcard cadastrado</p>}
            </Suspense>
           </div>
        </div>
    )
}

