import { Questionario } from "@/domain/entities/Questionario";
import { IQuestionarioRepository } from "@/domain/interfaces/questionarioInterface";

export class DeleteQuestionarioUseCase {
    constructor(private questionarioRepository: IQuestionarioRepository) {}

    async execute(id: string): Promise<Questionario | null> {
        try {
            return await this.questionarioRepository.deleteQuestionario(id);
        } catch (error) {
            console.error("Erro ao deletar questionário:", error);
            return null;
        }
    }
} 