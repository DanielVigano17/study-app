import { Suspense } from "react";
import { FlashCardDeck } from "./_components/FlashCardDeck";

export default async function PageFlashCards() {

    const flashCards = [
        { front: "What is the capital of France?", back: "Paris" },
        { front: "What is the largest planet in our solar system?", back: "Jupiter" },
        { front: "Who wrote 'Romeo and Juliet'?", back: "William Shakespeare" },
        { front: "What is the chemical symbol for gold?", back: "Au" },
        { front: "What year did World War II end?", back: "1945" },
    ]

    return (
        <div className="container mx-auto py-8 px-8 h-screen overflow-y-auto">
            <Suspense fallback={<p>Carregando...</p>}>
                <FlashCardDeck cards={flashCards} />
            </Suspense>
        </div>
    )
}

