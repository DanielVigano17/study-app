import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { FindManyFlashcard } from "@/domain/useCases/flashcard/findManyFlashcard";
import { FlashcardRepository } from "@/repositories/flashcard-repository";
import {
  createTestUserAndMateria,
  createTestFlashcard,
  cleanupTestData,
} from "../helpers/db";

describe("FindManyFlashcard (integração)", () => {
  let materiaId: string;
  let userId: string;

  beforeAll(async () => {
    const { user, materia } = await createTestUserAndMateria("findMany");
    userId = user.id;
    materiaId = materia.id;
    await createTestFlashcard(materiaId, { acao: "P1", resposta: "R1" });
    await createTestFlashcard(materiaId, { acao: "P2", resposta: "R2" });
  });

  afterAll(async () => {
    await cleanupTestData(userId);
  });

  it("retorna lista de flashcards da matéria", async () => {
    const repository = new FlashcardRepository();
    const useCase = new FindManyFlashcard(repository);

    const result = await useCase.execute(materiaId);

    expect(result).not.toBeNull();
    expect(result!.length).toBeGreaterThanOrEqual(2);
    expect(result!.some((f) => f.acao === "P1")).toBe(true);
    expect(result!.some((f) => f.acao === "P2")).toBe(true);
  });

  it("retorna array vazio para matéria sem flashcards", async () => {
    const { user: user2, materia: materiaVazia } = await createTestUserAndMateria("findMany-empty");
    const repository = new FlashcardRepository();
    const useCase = new FindManyFlashcard(repository);

    const result = await useCase.execute(materiaVazia.id);

    expect(result).not.toBeNull();
    expect(result!).toEqual([]);

    await cleanupTestData(user2.id);
  });
});
