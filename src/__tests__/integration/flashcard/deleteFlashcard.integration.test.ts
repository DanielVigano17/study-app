import { describe, it, expect, beforeAll, afterAll } from "vitest";
import DeleteFlashcardUseCase from "@/domain/useCases/flashcard/delete-flashcard";
import { FlashcardRepository } from "@/repositories/flashcard-repository";
import {
  createTestUserAndMateria,
  createTestFlashcard,
  cleanupTestData,
} from "../helpers/db";

describe("DeleteFlashcardUseCase (integração)", () => {
  let materiaId: string;
  let userId: string;

  beforeAll(async () => {
    const { user, materia } = await createTestUserAndMateria("delete");
    userId = user.id;
    materiaId = materia.id;
  });

  afterAll(async () => {
    await cleanupTestData(userId);
  });

  it("deleta flashcard com sucesso", async () => {
    const flashcard = await createTestFlashcard(materiaId, {
      acao: "Para deletar",
      resposta: "Será removido",
    });
    const repository = new FlashcardRepository();
    const useCase = new DeleteFlashcardUseCase(repository);

    const result = await useCase.execute(flashcard.id);

    expect(result).not.toBeNull();
    expect(result!.id).toBe(flashcard.id);
    expect(result!.acao).toBe("Para deletar");
  });

  it("retorna null quando flashcard não existe", async () => {
    const repository = new FlashcardRepository();
    const useCase = new DeleteFlashcardUseCase(repository);

    const result = await useCase.execute("flashcard-inexistente-123");

    expect(result).toBeNull();
  });
});
