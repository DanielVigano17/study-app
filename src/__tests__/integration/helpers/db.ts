import { prisma } from "@/prisma";

const TEST_MATERIA_TITULO = "Materia Teste Integração";

export async function createTestUserAndMateria(suiteId?: string) {
  const email = suiteId
    ? `test-${suiteId}@study-app.local`
    : `test-integration-${Date.now()}@study-app.local`;
  const user = await prisma.user.create({
    data: {
      email,
      name: "Usuário Teste",
    },
  });

  const materia = await prisma.materia.create({
    data: {
      titulo: `${TEST_MATERIA_TITULO} ${Date.now()}`,
      userId: user.id,
    },
  });

  return { user, materia };
}

export async function createTestFlashcard(materiaId: string, data?: { acao?: string; resposta?: string; diasProximaRevisao?: number; dtUltimaRevisao?: Date | null }) {
  return prisma.flashcard.create({
    data: {
      acao: data?.acao ?? "Pergunta teste",
      resposta: data?.resposta ?? "Resposta teste",
      materiaId,
      diasProximaRevisao: data?.diasProximaRevisao ?? 0,
      dtUltimaRevisao: data?.dtUltimaRevisao ?? null,
    },
  });
}

export async function cleanupTestData(userId: string) {
  await prisma.flashcard.deleteMany({
    where: { materia: { userId } },
  });
  await prisma.materia.deleteMany({ where: { userId } });
  await prisma.user.deleteMany({ where: { id: userId } });
}
