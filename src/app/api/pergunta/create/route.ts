import { modules } from "@/domain";
import { CreateFlashcardDTO } from "@/domain/interfaces/flashcardInterface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const data : CreateFlashcardDTO = await req.json();
    try{
        const perguntaCreated = await modules.useCase.flashcard.createFlashcard.execute(data);

        return NextResponse.json({status : 200, pergunta : perguntaCreated});
    }catch(e){
        console.log(e);

        return NextResponse.json({status : 400})
    }
}