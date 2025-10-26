import { modules } from "@/domain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    const {urlPdf, materiaId} = await req.json();
    try{
        const result = await modules.useCase.ai.gerarQuestionarioPDF.execute({urlPDF : urlPdf, materiaId : materiaId});

        return NextResponse.json({status : 200, questionario : result});
    }catch(e){
        console.log(e);

        return NextResponse.json({status : 400})
    }
}