-- AlterTable
ALTER TABLE "Pergunta" ADD COLUMN     "diasProximaRevisao" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "dtUltimaRevisao" TIMESTAMP(3),
ADD COLUMN     "facilidade" INTEGER NOT NULL DEFAULT 0;
