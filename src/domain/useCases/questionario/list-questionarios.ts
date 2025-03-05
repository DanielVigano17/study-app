import { Questionario } from "@/domain/entities/Questionario";
import { IQuestionarioRepository } from "@/domain/interfaces/questionarioInterface";

export class ListQuestionariosUseCase {
    constructor(private questionarioRepository: IQuestionarioRepository) {}

    async execute(materiaId: string): Promise<Questionario[]> {
        const questionarios = await this.questionarioRepository.listQuestionariosByMateriaId(materiaId);
        return questionarios;
    }
} 