import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { FindFlashcardsRevisao } from "@/domain/useCases/flashcard/find-flashcards-revisao";
import { FlashcardRepository } from "@/repositories/flashcard-repository";
import {
  createTestUserAndMateria,
  createTestFlashcard,
  cleanupTestData,
} from "../helpers/db";

describe("FindFlashcardsRevisao (integração)", () => {
  let materiaId: string;
  let userId: string;

  beforeAll(async () => {
    const { user, materia } = await createTestUserAndMateria("findRevisao");
    userId = user.id;
    materiaId = materia.id;
  });

  afterAll(async () => {
    await cleanupTestData(userId);
  });

  it("retorna flashcards que nunca foram revisados (sem dtUltimaRevisao)", async () => {
    await createTestFlashcard(materiaId, {
      acao: "Nunca revisado",
      resposta: "R",
      dtUltimaRevisao: null,
    });
    const repository = new FlashcardRepository();
    const useCase = new FindFlashcardsRevisao(repository);

    const result = await useCase.execute(materiaId);

    expect(result).not.toBeNull();
    expect(result!.length).toBeGreaterThanOrEqual(1);
    expect(result!.some((f) => f.acao === "Nunca revisado")).toBe(true);
  });

  it("retorna flashcards com data de revisão vencida", async () => {
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);
    await createTestFlashcard(materiaId, {
      acao: "Revisão vencida",
      resposta: "R",
      dtUltimaRevisao: ontem,
      diasProximaRevisao: 0,
    });
    const repository = new FlashcardRepository();
    const useCase = new FindFlashcardsRevisao(repository);

    const result = await useCase.execute(materiaId);

    expect(result).not.toBeNull();
    expect(result!.some((f) => f.acao === "Revisão vencida")).toBe(true);
  });

  it("retorna null quando não há flashcards para revisar", async () => {
    const { user: user2, materia: materiaVazia } = await createTestUserAndMateria("findRevisao-empty");
    const repository = new FlashcardRepository();
    const useCase = new FindFlashcardsRevisao(repository);

    const result = await useCase.execute(materiaVazia.id);

    expect(result).toBeNull();

    await cleanupTestData(user2.id);
  });
});
