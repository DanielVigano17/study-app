import { modules } from "@/domain";
import { CreateFlashcardDTO } from "@/domain/interfaces/perguntaInterface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const {materiaId} = await req.json();
    try{
        const perguntas = await modules.useCase.flashcard.findMany.execute(materiaId);

        return NextResponse.json({status : 200, perguntas : perguntas});
    }catch(e){
        console.log(e);

        return NextResponse.json({status : 400})
    }
}