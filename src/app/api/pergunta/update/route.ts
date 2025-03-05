import { modules } from "@/domain";
import { CreateFlashcardDTO, UpdateFlashcardDTO } from "@/domain/interfaces/perguntaInterface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const data  = await req.json();
    try{
        const perguntaUpdated = await modules.useCase.flashcard.update.execute(data.object, data.id);

        return NextResponse.json({status : 200, pergunta : perguntaUpdated});
    }catch(e){
        console.log(e);

        return NextResponse.json({status : 400})
    }
}