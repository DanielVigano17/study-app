import { NextResponse } from "next/server"
import AiService from "@/services/ai-service"

export async function POST(request: Request) {
  try {
    const { question } = await request.json()

    if (!question) {
      return NextResponse.json(
        { error: "A pergunta é obrigatória" },
        { status: 400 }
      )
    }

    const result = await AiService.gerarRespostaFlashcard({ question })
    return NextResponse.json(result)
  } catch (error) {
    console.error("Erro ao gerar resposta:", error)
    return NextResponse.json(
      { error: "Erro ao gerar resposta" },
      { status: 500 }
    )
  }
} 