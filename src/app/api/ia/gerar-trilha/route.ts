import { checkFeatureLimits } from "@/middleware/checkFeatureLimits";
import { NextRequest, NextResponse } from "next/server";
import { modules } from "@/domain";

export async function POST(req: NextRequest) {
  try {
    const { materia, descricaoAdicional, nivel, duracao, userId, subscriptionId } = await req.json();
    
    const trilhaGerada = await modules.useCase.ai.gerarTrilhaEstudos.execute({
      materia,
      descricaoAdicional,
      nivel,
      duracao
    });

    console.log('Trilha gerada com sucesso:', trilhaGerada?.titulo);

    if (!trilhaGerada) {
      return NextResponse.json({ 
        status: 400, 
        message: "Não foi possível gerar a trilha de estudos" 
      });
    }

    return NextResponse.json({ 
      status: 200, 
      trilha: trilhaGerada 
    });

  } catch (error) {
    console.error("Erro ao gerar trilha:", error);
    return NextResponse.json({ 
      status: 500, 
      message: error instanceof Error ? error.message : "Erro interno do servidor" 
    });
  }
}
