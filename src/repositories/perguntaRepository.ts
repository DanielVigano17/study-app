import { Pergunta } from "@/domain/entities/Pergunta";
import { CreatePerguntaDTO, IPerguntaRepository } from "@/domain/interfaces/perguntaInterface";
import { prisma } from "@/prisma";

export class PerguntaRepository implements IPerguntaRepository{
    
    async createPergunta(data: CreatePerguntaDTO) {
        return await prisma.pergunta.create({data});
    }
    async findManyPergunta(materiaId: string){
        return await prisma.pergunta.findMany({where:{materiaId}});
    }
}