import { CreateFlashcardDTO, IFlashcardRepository } from "@/domain/interfaces/flashcardInterface";

export class CreateManyFlashcardUseCase {
    constructor(private flashcardRepository: IFlashcardRepository) {}

    async execute(data: CreateFlashcardDTO[]): Promise<{ count: number }> {
        return await this.flashcardRepository.createManyFlashcard(data);
    }
}