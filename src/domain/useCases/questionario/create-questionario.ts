import { CreateFlashcardDTO, IFlashcardRepository } from "@/domain/interfaces/flashcardInterface";
import { Flashcard } from "@/domain/entities/Flashcard";
import { CreateQuestionarioDTO, IQuestionarioRepository } from "@/domain/interfaces/questionarioInterface";
import { Questionario } from "@/domain/entities/Questionario";

export class CreateQuestionarioUseCase {
  constructor(private questionarioRepository : IQuestionarioRepository) {}

  async execute(data : CreateQuestionarioDTO): Promise<Questionario | null> {
    try{
        return await this.questionarioRepository.createQuestionario(data);
    }catch(error){
        console.log(error);
        return null;
    }
  }
}
