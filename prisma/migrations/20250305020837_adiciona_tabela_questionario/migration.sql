-- CreateTable
CREATE TABLE "Questionario" (
    "id" TEXT NOT NULL,
    "perguntas" JSONB NOT NULL,
    "dtUltimaRevisao" TIMESTAMP(3),
    "materiaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Questionario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Questionario" ADD CONSTRAINT "Questionario_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
