import { modules } from "@/domain";
import { CreatePerguntaDTO } from "@/domain/interfaces/perguntaInterface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, res : NextResponse){
    const data : CreatePerguntaDTO = await req.json();
    try{
        const perguntaCreated = await modules.useCase.pergunta.createPergunta.execute(data);

        return NextResponse.json({status : 200, pergunta : perguntaCreated});
    }catch(e){
        console.log(e);

        return NextResponse.json({status : 400})
    }
}