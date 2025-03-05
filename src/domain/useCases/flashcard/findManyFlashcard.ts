import { CreateFlashcardDTO, IFlashcardRepository } from "@/domain/interfaces/perguntaInterface";
import { Flashcard } from "@/domain/entities/Flashcard";

export class FindManyFlashcard {
  constructor(private flashcardRepository : IFlashcardRepository) {}

  async execute(materiaId : string): Promise<Flashcard[] | null> {
    try{
        return await this.flashcardRepository.findManyFlashcard(materiaId);
    }catch(error){
        console.log(error);
        return null;
    }
  }
}
