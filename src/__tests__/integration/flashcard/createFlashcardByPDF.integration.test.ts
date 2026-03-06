import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { CreateFlashcardByPDF } from "@/domain/useCases/flashcard/create-flashcard-by-pdf";
import { FlashcardRepository } from "@/repositories/flashcard-repository";
import { prisma } from "@/prisma";
import type { IAiReposository } from "@/domain/interfaces/ai-interface";
import {
  createTestUserAndMateria,
  cleanupTestData,
} from "../helpers/db";

describe("CreateFlashcardByPDF (integração)", () => {
  let materiaId: string;
  let userId: string;

  beforeAll(async () => {
    const { user, materia } = await createTestUserAndMateria("createByPDF");
    userId = user.id;
    materiaId = materia.id;
  });

  afterAll(async () => {
    await cleanupTestData(userId);
  });

  it("cria flashcards no banco a partir do retorno mockado da IA", async () => {
    const flashcardsJson = JSON.stringify([
      { acao: "O que é PDF?", resposta: "Formato de documento." },
      { acao: "O que é IA?", resposta: "Inteligência Artificial." },
    ]);

    const mockAiRepo: IAiReposository = {
      gerarFlashcardPDF: vi.fn().mockResolvedValue(flashcardsJson),
      gerarRespostaFlashcard: vi.fn(),
      gerarPergunta: vi.fn(),
      gerarQuestionarioByPDF: vi.fn(),
    };

    const flashcardRepository = new FlashcardRepository();
    const useCase = new CreateFlashcardByPDF(flashcardRepository, mockAiRepo);

    const result = await useCase.execute({
      urlPDF: "https://exemplo.com/doc.pdf",
      materiaId,
    });

    expect(result).toHaveLength(2);
    expect(result[0].acao).toBe("O que é PDF?");
    expect(result[0].materiaId).toBe(materiaId);

    const noBanco = await prisma.flashcard.findMany({
      where: { materiaId },
    });
    expect(noBanco.filter((f) => f.acao === "O que é PDF?").length).toBe(1);
    expect(noBanco.filter((f) => f.acao === "O que é IA?").length).toBe(1);
  });
});
