-- CreateTable
CREATE TABLE "Materia" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pergunta" (
    "id" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "materiaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pergunta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pergunta" ADD CONSTRAINT "Pergunta_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
