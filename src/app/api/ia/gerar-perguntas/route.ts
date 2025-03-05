import { modules } from "@/domain";
import { CreateFlashcardDTO } from "@/domain/interfaces/perguntaInterface";
import AiService from "@/services/ai-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const prompt = await req.json();
    try{
        const perguntasGeradas = await AiService.gerarPergunta({prompt : prompt});
        return NextResponse.json({status : 200, perguntas : perguntasGeradas});
    }catch(e){
        console.log(e);

        return NextResponse.json({status : 400})
    }
}