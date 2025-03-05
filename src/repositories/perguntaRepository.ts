import { Flashcard } from "@/domain/entities/Flashcard";
import { CreateFlashcardDTO, IFlashcardRepository, UpdateFlashcardDTO } from "@/domain/interfaces/perguntaInterface";
import { prisma } from "@/prisma";

export class FlashcardRepository implements IFlashcardRepository{
    async update (data: UpdateFlashcardDTO, id: string){
        return prisma.flashcard.update({where:{id},data});
    };
    async deleteFlashcard (flashcardId: string){
        return await prisma.flashcard.delete({where:{id:flashcardId}})
    }
    async createFlashcard(data: CreateFlashcardDTO) : Promise<Flashcard>{
        return await prisma.flashcard.create({data});
    }
    async findManyFlashcard(materiaId: string) : Promise<Flashcard[]>{
        return await prisma.flashcard.findMany({where:{materiaId}});
    }
}