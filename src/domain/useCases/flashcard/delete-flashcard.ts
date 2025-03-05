import { IFlashcardRepository } from "@/domain/interfaces/perguntaInterface";
import { Flashcard } from "@prisma/client";


export default class DeleteFlashcardUseCase {

    constructor(private flashcardRepository : IFlashcardRepository){}
    async execute(flashcardId : string) : Promise<Flashcard | null>{
        try{
            const flashcardExcluida = await this.flashcardRepository.deleteFlashcard(flashcardId);
            return flashcardExcluida;
            
        }catch(error){
            console.error(error);
            return null;
        }
    }
}