import { IFlashcardRepository } from "@/domain/interfaces/flashcardInterface";
import { Flashcard } from "@/domain/entities/Flashcard";

export class FindFlashcardsRevisao {
  constructor(private flashcardRepository : IFlashcardRepository) {}

  async execute(materiaId : string): Promise<Flashcard[] | null> {
    try{
        const flashcards = await this.flashcardRepository.findManyFlashcard(materiaId);

        const flashcardsParaRevisar = flashcards.filter(flashcard => {
            const dataUltimaRevisao = flashcard.dtUltimaRevisao ? new Date(flashcard.dtUltimaRevisao) : null;
        
            if (!dataUltimaRevisao) return true;
        
            // Adiciona os dias da próxima revisão à data da última revisão
            const dataProximaRevisao = new Date(dataUltimaRevisao);
            dataProximaRevisao.setDate(dataProximaRevisao.getDate() + flashcard.diasProximaRevisao);
        
            // Compara com a data atual
            return dataProximaRevisao <= new Date();
        });

        return flashcardsParaRevisar.length > 0 ? flashcardsParaRevisar : null;

    }catch(error){
        console.log(error);
        return null;
    }
  }
}
