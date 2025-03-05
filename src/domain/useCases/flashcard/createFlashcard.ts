import { CreateFlashcardDTO, IFlashcardRepository } from "@/domain/interfaces/flashcardInterface";
import { Flashcard } from "@/domain/entities/Flashcard";

export class CreateFlashcardUseCase {
  constructor(private flashcardRepository : IFlashcardRepository) {}

  async execute(data : CreateFlashcardDTO): Promise<Flashcard | null> {
    try{
        return await this.flashcardRepository.createFlashcard(data);
    }catch(error){
        console.log(error);
        return null;
    }
  }
}
