import { modules } from "@/domain";
import { checkFeatureLimits } from "@/middleware/checkFeatureLimits";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    const {urlPdf, materiaId, userId, subscriptionId} = await req.json();
    const limitCheck = await checkFeatureLimits(req, 'flashcards', userId, subscriptionId);
    
    if (limitCheck.status !== 200) {
        return limitCheck;
    }

    try{
        const result = await modules.useCase.ai.gerarQuestionarioPDF.execute({urlPDF : urlPdf, materiaId : materiaId});

        return NextResponse.json({status : 200, questionario : result});
    }catch(e){
        console.log(e);

        return NextResponse.json({status : 400})
    }
}