import { modules } from "@/domain";
import AiService from "@/services/ai-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const {prompt,materiaId, quntidadePerguntas, dificuldade} = await req.json();
    try{
        const perguntasGeradas = await AiService.gerarPergunta({prompt : prompt, dificuldade : dificuldade, quantidade : quntidadePerguntas});
        const questionarioCriado =  await modules.useCase.questionario.create.execute({perguntas : perguntasGeradas, materiaId : materiaId});
        console.log(questionarioCriado);
        return NextResponse.json({status : 200, perguntas : perguntasGeradas});
    }catch(e){
        console.log(e);

        return NextResponse.json({status : 400})
    }
}