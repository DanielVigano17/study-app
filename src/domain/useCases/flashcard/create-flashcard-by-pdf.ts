import { CreateFlashcardDTO, IFlashcardRepository } from "@/domain/interfaces/flashcardInterface";
import { Flashcard } from "@/domain/entities/Flashcard";
import { GerarFlashcardPDFDTO, IAiReposository } from "@/domain/interfaces/ai-interface";

export class CreateFlashcardByPDF {
  constructor(private flashcardRepository : IFlashcardRepository,
    private readonly aiRepository : IAiReposository
  ) {}

  async execute(data : GerarFlashcardPDFDTO): Promise<Flashcard[]> {
        const flashcardsSerializado = await this.aiRepository.gerarFlashcardPDF(data);
        let flashcards = JSON.parse(flashcardsSerializado);
        
        flashcards = flashcards.map((flashcard : Flashcard) => {
          return {
            acao: flashcard.acao,
            resposta: flashcard.resposta,
            materiaId: data.materiaId,
          }
        });

        await this.flashcardRepository.createManyFlashcard(flashcards);
        
        return flashcards;
  }
}
