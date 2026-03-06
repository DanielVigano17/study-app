import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { CreateManyFlashcardUseCase } from "@/domain/useCases/flashcard/create-many-flashcards";
import { FlashcardRepository } from "@/repositories/flashcard-repository";
import { prisma } from "@/prisma";
import {
  createTestUserAndMateria,
  cleanupTestData,
} from "../helpers/db";

describe("CreateManyFlashcardUseCase (integração)", () => {
  let materiaId: string;
  let userId: string;

  beforeAll(async () => {
    const { user, materia } = await createTestUserAndMateria("createMany");
    userId = user.id;
    materiaId = materia.id;
  });

  afterAll(async () => {
    await cleanupTestData(userId);
  });

  it("cria múltiplos flashcards com sucesso", async () => {
    const repository = new FlashcardRepository();
    const useCase = new CreateManyFlashcardUseCase(repository);

    const result = await useCase.execute([
      { acao: "P1", resposta: "R1", materiaId },
      { acao: "P2", resposta: "R2", materiaId },
      { acao: "P3", resposta: "R3", materiaId },
    ]);

    expect(result.count).toBe(3);

    const flashcards = await prisma.flashcard.findMany({
      where: { materiaId },
    });
    expect(flashcards.filter((f) => f.acao === "P1").length).toBe(1);
    expect(flashcards.filter((f) => f.acao === "P2").length).toBe(1);
    expect(flashcards.filter((f) => f.acao === "P3").length).toBe(1);
  });

  it("retorna count 0 quando array vazio", async () => {
    const repository = new FlashcardRepository();
    const useCase = new CreateManyFlashcardUseCase(repository);

    const result = await useCase.execute([]);

    expect(result.count).toBe(0);
  });
});
