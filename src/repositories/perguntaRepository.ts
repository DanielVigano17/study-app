import { Pergunta } from "@/domain/entities/Pergunta";
import { CreatePerguntaDTO, IPerguntaRepository, UpdatePerguntaDTO } from "@/domain/interfaces/perguntaInterface";
import { prisma } from "@/prisma";

export class PerguntaRepository implements IPerguntaRepository{
    async update (data: UpdatePerguntaDTO, id: string){
        return prisma.pergunta.update({where:{id},data});
    };
    async deletePergunta (perguntaId: string){
        return await prisma.pergunta.delete({where:{id:perguntaId}})
    }
    async createPergunta(data: CreatePerguntaDTO) : Promise<Pergunta>{
        return await prisma.pergunta.create({data});
    }
    async findManyPergunta(materiaId: string) : Promise<Pergunta[]>{
        return await prisma.pergunta.findMany({where:{materiaId}});
    }
}