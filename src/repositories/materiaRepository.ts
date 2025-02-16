import { Materia } from "@/domain/entities/Materia";
import { CreateMateriaDTO, IMateriaRepository, UpdateMateriaDTO } from "@/domain/interfaces/materiaInterface";
import { prisma } from "@/prisma";

export class MateriaRepository implements IMateriaRepository{
    async find(materiaId: string) {
        return await prisma.materia.findUnique({where:{id:materiaId}});
    }
    async delete(materiaId: string){
        return await prisma.materia.delete({where:{id:materiaId}})
    };
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