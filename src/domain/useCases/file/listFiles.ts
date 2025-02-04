import { FileRepository } from "@/repositories/fileRepository";

export class ListFiles {
    constructor(private fileRepository: FileRepository){}

    async execute(materiaId : string){
        const files = await this.fileRepository.getFilesMateria(materiaId);
        return files;
    }
}