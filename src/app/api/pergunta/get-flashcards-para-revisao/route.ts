import { modules } from "@/domain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const {materiaId} = await req.json();
    console.log("Esse foi o materiaId", materiaId);
    try{
        const flashcardsParaRevisar = await modules.useCase.flashcard.findflashcardRevisao.execute(materiaId);

        return NextResponse.json({status : 200, flashcardsParaRevisar : flashcardsParaRevisar});
    }catch(e){
        console.log(e);
        return NextResponse.json({status : 400})
    }
}   