import { File } from "../entities/File";

export interface CreateFileDTO {
    fileName : string
    materiaId : string
    url: string
    supabaseId : string
}


export interface IFilesRepository{
    createFile : (data : CreateFileDTO) => Promise<File>
    getFilesMateria : (materiaId : string) => Promise<File[]>
}