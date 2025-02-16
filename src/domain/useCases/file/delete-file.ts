import { File } from "@/domain/entities/File";
import { IFilesRepository } from "@/domain/interfaces/fileInterface";
import FileService from "@/services/upload-service";

export default class DeleteFileUseCase {
    constructor(private fileRepository : IFilesRepository){}
    async execute(fileId : string, filePath : string) : Promise<File | null>{
        try{
            const result = await FileService.removeFile(filePath);

            if(!result.success) throw new Error(result.errorMessage);

            const fileRemoved = await this.fileRepository.removeFile(fileId);
            return fileRemoved;
        }catch(error){
            console.error(error);
            return null;
        }
    }
}