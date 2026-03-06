import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { UpdateFlashcardUseCase } from "@/domain/useCases/flashcard/update-flashcard";
import { FlashcardRepository } from "@/repositories/flashcard-repository";
import {
  createTestUserAndMateria,
  createTestFlashcard,
  cleanupTestData,
} from "../helpers/db";

describe("UpdateFlashcardUseCase (integração)", () => {
  let materiaId: string;
  let userId: string;

  beforeAll(async () => {
    const { user, materia } = await createTestUserAndMateria("update");
    userId = user.id;
    materiaId = materia.id;
  });

  afterAll(async () => {
    await cleanupTestData(userId);
  });

  it("atualiza flashcard com sucesso", async () => {
    const flashcard = await createTestFlashcard(materiaId, {
      acao: "Original",
      resposta: "Resposta original",
    });
    const repository = new FlashcardRepository();
    const useCase = new UpdateFlashcardUseCase(repository);

    const result = await useCase.execute(
      {
        acao: "Pergunta atualizada",
        resposta: "Resposta atualizada",
        dtUltimaRevisao: new Date(),
      },
      flashcard.id
    );

    expect(result).not.toBeNull();
    expect(result!.acao).toBe("Pergunta atualizada");
    expect(result!.resposta).toBe("Resposta atualizada");
    expect(result!.dtUltimaRevisao).not.toBeNull();
  });

  it("retorna null quando flashcard não existe", async () => {
    const repository = new FlashcardRepository();
    const useCase = new UpdateFlashcardUseCase(repository);

    const result = await useCase.execute(
      {
        acao: "test",
        dtUltimaRevisao: null,
      },
      "flashcard-inexistente-123"
    );

    expect(result).toBeNull();
  });
});
