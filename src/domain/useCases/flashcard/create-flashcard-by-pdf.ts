import { CreateFlashcardDTO, IFlashcardRepository } from "@/domain/interfaces/flashcardInterface";
import { Flashcard } from "@/domain/entities/Flashcard";
import { GerarFlashcardPDFDTO, IAiReposository } from "@/domain/interfaces/ai-interface";

export class CreateFlashcardByPDF {
  constructor(private flashcardRepository : IFlashcardRepository,
    private readonly aiRepository : IAiReposository
  ) {}

  async execute(data : GerarFlashcardPDFDTO): Promise<Flashcard[]> {
        const flashcardsSerializado = await this.aiRepository.gerarFlashcardPDF(data);
        const flashcards = JSON.parse(flashcardsSerializado);
        console.log(flashcards)
        return flashcards;
  }
}
