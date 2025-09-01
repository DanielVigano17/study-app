import { NextResponse } from "next/server"
import { modules } from "@/domain"

export async function POST(request: Request) {
  try {
    const { question } = await request.json()

    if (!question) {
      return NextResponse.json(
        { error: "A pergunta é obrigatória" },
        { status: 400 }
      )
    }

    const result = await modules.useCase.ai.gerarRespostaFlashcard.execute({ pergunta: question })
    return NextResponse.json({ answer: result });
  } catch (error) {
    console.error("Erro ao gerar resposta:", error)
    return NextResponse.json(
      { error: "Erro ao gerar resposta" },
      { status: 500 }
    )
  }
} 