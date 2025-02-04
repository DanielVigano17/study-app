import { CreateFileDTO, IFilesRepository } from "@/domain/interfaces/fileInterface";
import { prisma } from "@/prisma";
export class FileRepository implements IFilesRepository {
    async createFile(data: CreateFileDTO){
        const file = await prisma.file.create({data});
        return file;
    };
    async getFilesMateria (materiaId: string){
        const files = await prisma.file.findMany({where:{materiaId:materiaId}});
        return files;
    };

}