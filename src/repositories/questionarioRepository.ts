import { Questionario } from "@/domain/entities/Questionario";
import { CreateQuestionarioDTO, IQuestionarioRepository } from "@/domain/interfaces/questionarioInterface";
import { prisma } from "@/prisma";
import { ListaPerguntas } from "@/services/ai-service";

export class QuestionarioRepository implements IQuestionarioRepository{
    async createQuestionario(data: CreateQuestionarioDTO) : Promise<Questionario>{
        try {
            
            const questionarioData = {
                perguntas: data.perguntas,
                materiaId: data.materiaId || "",
                nome: data.perguntas.nome || ""
            };
            const questionario = await prisma.questionario.create({
                data: questionarioData
            });

            if(questionario.perguntas){
                const objectResponse : Questionario = {
                    createdAt : questionario.createdAt,
                    dtUltimaRevisao : questionario.dtUltimaRevisao,
                    id: questionario.id,
                    nome: data.perguntas.nome,
                    perguntas : data.perguntas,
                    updatedAt : questionario.updatedAt,
                    materiaId : questionario.materiaId
                }
                return objectResponse;
            }
        } catch (error) {
            console.error("Erro ao criar questionário:", error);
            throw error;
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
            nome: questionario.nome,
            perguntas: questionario.perguntas as ListaPerguntas,
            dtUltimaRevisao: questionario.dtUltimaRevisao,
            createdAt: questionario.createdAt,
            updatedAt: questionario.updatedAt,
            materiaId: questionario.materiaId
        }));
    }

    async getById(id: string): Promise<Questionario | null> {
        const questionario = await prisma.questionario.findUnique({
            where: {
                id: id
            }
        });

        if (!questionario) return null;

        return {
            id: questionario.id,
            nome: questionario.nome,
            perguntas: questionario.perguntas as ListaPerguntas,
            dtUltimaRevisao: questionario.dtUltimaRevisao,
            createdAt: questionario.createdAt,
            updatedAt: questionario.updatedAt,
            materiaId: questionario.materiaId
        };
    }
}