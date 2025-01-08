import { CreateFileDTO } from "@/domain/interfaces/fileInterface";
import { FileRepository } from "@/repositories/fileRepository";

export class CreateFile {

    constructor(private fileRepository : FileRepository){}

    async execute(data : CreateFileDTO){
        const file = await this.fileRepository.createFile(data);

        return file;
    }
}