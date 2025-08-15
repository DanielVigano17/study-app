import { modules } from "@/domain";
import { checkFeatureLimits } from "@/middleware/checkFeatureLimits";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    const {urlPdf, materiaId, userId, subscriptionId} = await req.json();
    const limitCheck = await checkFeatureLimits(req, 'flashcards', userId, subscriptionId);
    
    if (limitCheck.status !== 200) {
        return limitCheck;
    }

    try{
        const flashcards = await modules.useCase.ai.gerarFlashcardPDF.execute({urlPDF : urlPdf});

        flashcards.forEach(flashcard => {
            flashcard.materiaId = materiaId;
        });

        const result = await modules.useCase.flashcard.createManyFlashcard.execute(flashcards);

        return NextResponse.json({status : 200, count : result.count});
    }catch(e){
        console.log(e);

        return NextResponse.json({status : 400})
    }
}