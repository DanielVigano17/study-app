import { modules } from "@/domain";
import { checkFeatureLimits } from "@/middleware/checkFeatureLimits";
import AiService from "@/services/ai-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const {prompt,materiaId, quntidadePerguntas, dificuldade, userId, subscriptionId} = await req.json();

    const limitCheck = await checkFeatureLimits(req, 'quizzes', userId, subscriptionId);
    if (limitCheck.status !== 200) {
      return limitCheck;
    }
    
    try{
        const questionarioGerado = await modules.useCase.ai.gerarPerguntasQuestionario.execute({prompt : prompt, dificuldade : dificuldade, quantidade : quntidadePerguntas});
        
        if (!questionarioGerado || !questionarioGerado.perguntas || questionarioGerado.perguntas.length === 0) {
            return NextResponse.json({status : 400, message: "Não foi possível gerar as perguntas"});
        }

        const questionarioCriado = await modules.useCase.questionario.create.execute({
            perguntas: questionarioGerado.perguntas,
            materiaId: materiaId,
            nome: questionarioGerado.nome
        });

        if (!questionarioCriado) {
            return NextResponse.json({status : 400, message: "Erro ao criar o questionário"});
        }

        return NextResponse.json({status : 200, questionario : questionarioGerado});
    }catch(e){
        console.log(e);
        return NextResponse.json({status : 400, message: "Erro ao processar a solicitação"})
    }
}