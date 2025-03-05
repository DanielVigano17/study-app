import { Questionario } from "@/domain/entities/Questionario";
import { CreateQuestionarioDTO, IQuestionarioRepository } from "@/domain/interfaces/questionarioInterface";
import { prisma } from "@/prisma";
import { ListaPerguntas } from "@/services/ai-service";

export class QuestionarioRepository implements IQuestionarioRepository{
    async createQuestionario(data: CreateQuestionarioDTO) : Promise<Questionario>{
        const questionario = await prisma.questionario.create({
            data : {
                perguntas : data.perguntas,
                materiaId : data.materiaId
            }
        });
        if(questionario.perguntas){
            const objectResponse : Questionario = {
                createdAt : questionario.createdAt,
                dtUltimaRevisao : questionario.dtUltimaRevisao,
                id: questionario.id,
                perguntas : data.perguntas,
                updatedAt : questionario.updatedAt
            }
            return objectResponse;
        }

        throw new Error("Perguntas não cadastradas no questionario")

    }

    async listQuestionariosByMateriaId(materiaId: string): Promise<Questionario[]> {
        const questionarios = await prisma.questionario.findMany({
            where: {
                materiaId: materiaId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return questionarios.map(questionario => ({
            id: questionario.id,
            perguntas: questionario.perguntas as ListaPerguntas,
            dtUltimaRevisao: questionario.dtUltimaRevisao,
            createdAt: questionario.createdAt,
            updatedAt: questionario.updatedAt
        }));
    }
}