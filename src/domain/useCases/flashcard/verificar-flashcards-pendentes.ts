import { FlashcardRepository } from "@/repositories/perguntaRepository";
import { Flashcard } from "@/domain/entities/Flashcard";

export class VerificarFlashcardsPendentesUseCase {
  constructor(private flashcardRepository: FlashcardRepository) {}

  async execute(materiaId: string): Promise<boolean> {
    try {
      const flashcards = await this.flashcardRepository.getFlashcardsByMateriaId(materiaId);
      
      // Verifica se existem flashcards pendentes (não revisados ou com data de revisão vencida)
      const hoje = new Date();
      const temPendentes = flashcards.some(flashcard => {
        const dataUltimaRevisao = flashcard.dtUltimaRevisao ? new Date(flashcard.dtUltimaRevisao) : null
        if (!dataUltimaRevisao) return true; // Se não tem data de revisão, está 
        
        // Adiciona os dias da próxima revisão à data da última revisão
        const dataProximaRevisao = new Date(dataUltimaRevisao);
        dataProximaRevisao.setDate(dataProximaRevisao.getDate() + flashcard.diasProximaRevisao);

        // Compara com a data atual
        return dataProximaRevisao <= new Date() ? true : false;
      });

      return temPendentes;
    } catch (error) {
      console.error("Erro ao verificar flashcards pendentes:", error);
      return false;
    }
  }
} 