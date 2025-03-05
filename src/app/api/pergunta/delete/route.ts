import { modules } from "@/domain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const perguntaId : string = await req.json();
    try{
        const perguntaDeleted = await modules.useCase.flashcard.deleteFlashcard.execute(perguntaId);

        return NextResponse.json({status : 200, pergunta : perguntaDeleted});
    }catch(e){
        console.error(e);
        return NextResponse.json({status : 400})
    }
}