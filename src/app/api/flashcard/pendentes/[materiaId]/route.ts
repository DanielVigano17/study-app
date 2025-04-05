import { NextResponse } from "next/server";
import { VerificarFlashcardsPendentesUseCase } from "@/domain/useCases/flashcard/verificar-flashcards-pendentes";
import { FlashcardRepository } from "@/repositories/perguntaRepository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ materiaId: string }> }
) {
  try {
    // Extrair o materiaId dos parâmetros
    const { materiaId } = await params;
    
    const flashcardRepository = new FlashcardRepository();
    const verificarFlashcardsPendentesUseCase = new VerificarFlashcardsPendentesUseCase(flashcardRepository);
    
    const temPendentes = await verificarFlashcardsPendentesUseCase.execute(materiaId);
    
    return NextResponse.json({ temPendentes });
  } catch (error) {
    console.error("Erro ao verificar flashcards pendentes:", error);
    return NextResponse.json(
      { error: "Erro ao verificar flashcards pendentes" },
      { status: 500 }
    );
  }
} 