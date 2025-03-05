import { CreateFlashcardDTO, IFlashcardRepository, UpdateFlashcardDTO } from "@/domain/interfaces/flashcardInterface";
import { Flashcard } from "@/domain/entities/Flashcard";

export class UpdateFlashcardUseCase {
  constructor(private flashcardRepository : IFlashcardRepository) {}

  async execute(data : UpdateFlashcardDTO, id : string): Promise<Flashcard | null> {
    try{
        return await this.flashcardRepository.update(data, id);
    }catch(error){
        console.log(error);
        return null;
    }
  }
}
