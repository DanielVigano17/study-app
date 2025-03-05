import { Questionario } from "@/domain/entities/Questionario";
import { IQuestionarioRepository } from "@/domain/interfaces/questionarioInterface";

export class GetQuestionarioUseCase {
    constructor(private questionarioRepository: IQuestionarioRepository) {}

    async execute(id: string): Promise<Questionario | null> {
        try {
            return await this.questionarioRepository.getById(id);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
} 