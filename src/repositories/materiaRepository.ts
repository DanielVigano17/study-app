import { CreateMateriaDTO, IMateriaRepository, UpdateMateriaDTO } from "@/domain/interfaces/materiaInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class MateriaRepository implements IMateriaRepository{
    async listMaterias (userId: string) {
        return await prisma.materia.findMany({where:{userId}});
    };
    async update(id: string, data: UpdateMateriaDTO){
        return await prisma.materia.update({where:{id},data});
    };
    async create(data: CreateMateriaDTO){
        return await prisma.materia.create({data});
    };
}