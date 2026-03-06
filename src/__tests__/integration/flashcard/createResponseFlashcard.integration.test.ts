import { describe, it, expect, vi } from "vitest";
import { CreateResponseFlashcard } from "@/domain/useCases/flashcard/create-response-flashcard";
import type { IAiReposository } from "@/domain/interfaces/ai-interface";

describe("CreateResponseFlashcard (integração)", () => {
  it("retorna resposta parseada da IA", async () => {
    const respostaJson = JSON.stringify("Resposta gerada pela IA para a pergunta.");

    const mockAiRepo: IAiReposository = {
      gerarRespostaFlashcard: vi.fn().mockResolvedValue(respostaJson),
      gerarFlashcardPDF: vi.fn(),
      gerarPergunta: vi.fn(),
      gerarQuestionarioByPDF: vi.fn(),
    };

    const useCase = new CreateResponseFlashcard(mockAiRepo);

    const result = await useCase.execute({
      pergunta: "O que é React?",
    });

    expect(result).toBe("Resposta gerada pela IA para a pergunta.");
    expect(mockAiRepo.gerarRespostaFlashcard).toHaveBeenCalledWith({
      pergunta: "O que é React?",
    });
  });
});
