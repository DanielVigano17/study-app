import { modules } from "@/domain";
import { CreateFlashcardDTO } from "@/domain/interfaces/flashcardInterface";
import { checkFeatureLimits } from "@/middleware/checkFeatureLimits";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const {data, userId, subscriptionId} = await req.json();
    const limitCheck = await checkFeatureLimits(req, 'flashcards', userId, subscriptionId);
    
    if (limitCheck.status !== 200) {
        return limitCheck;
    }

    try{
        const perguntaCreated = await modules.useCase.flashcard.createFlashcard.execute(data);

        return NextResponse.json({status : 200, pergunta : perguntaCreated});
    }catch(e){
        console.log(e);

        return NextResponse.json({status : 400})
    }
}