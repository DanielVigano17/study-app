/*
  Warnings:

  - You are about to drop the `Pergunta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pergunta" DROP CONSTRAINT "Pergunta_materiaId_fkey";

-- DropTable
DROP TABLE "Pergunta";

-- CreateTable
CREATE TABLE "Flashcard" (
    "id" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "materiaId" TEXT NOT NULL,
    "facilidade" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "diasProximaRevisao" INTEGER NOT NULL DEFAULT 0,
    "dtUltimaRevisao" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
