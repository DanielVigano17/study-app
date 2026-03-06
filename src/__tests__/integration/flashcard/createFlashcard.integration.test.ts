import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { CreateFlashcardUseCase } from "@/domain/useCases/flashcard/createFlashcard";
import { FlashcardRepository } from "@/repositories/flashcard-repository";
import {
  createTestUserAndMateria,
  cleanupTestData,
} from "../helpers/db";

describe("CreateFlashcardUseCase (integração)", () => {
  let materiaId: string;
  let userId: string;

  beforeAll(async () => {
    const { user, materia } = await createTestUserAndMateria("createFlashcard");
    userId = user.id;
    materiaId = materia.id;
  });

  afterAll(async () => {
    await cleanupTestData(userId);
  });

  it("cria flashcard no banco de dados com sucesso", async () => {
    const repository = new FlashcardRepository();
    const useCase = new CreateFlashcardUseCase(repository);

    const result = await useCase.execute({
      acao: "O que é React?",
      resposta: "Biblioteca JavaScript para construir interfaces de usuário.",
      materiaId,
    });

    expect(result).not.toBeNull();
    expect(result!.id).toBeDefined();
    expect(result!.acao).toBe("O que é React?");
    expect(result!.resposta).toBe(
      "Biblioteca JavaScript para construir interfaces de usuário."
    );
    expect(result!.materiaId).toBe(materiaId);
    expect(result!.facilidade).toBe(0);
    expect(result!.diasProximaRevisao).toBe(0);
  });

  it("retorna null quando materiaId não existe", async () => {
    const repository = new FlashcardRepository();
    const useCase = new CreateFlashcardUseCase(repository);

    const result = await useCase.execute({
      acao: "test",
      resposta: "test",
      materiaId: "materia-inexistente-123",
    });

    expect(result).toBeNull();
  });
});
