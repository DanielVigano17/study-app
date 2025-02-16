import { File } from "@/domain/entities/File"
import supabase from "@/lib/supabase-client"

interface UploadFileDTO {
    fileBlob : Blob
    fileName : string
}

interface CreateFileResonse {
    success : boolean
    file : Pick<File, "url" | "id"> | null,
    errorMessage? : string
}

interface DeleteFileResonse {
    success : boolean
    file : Pick<File, "fileName" | "id"> | null,
    errorMessage? : string
}

export default class FileService {

    static async uploadFile({fileBlob,fileName}:UploadFileDTO) : Promise<CreateFileResonse>{
        
        const { error, data } = await supabase.storage
        .from('teste')
        .upload(fileName, fileBlob, {
        cacheControl: '3600'
        })

        if (error) return {
            success : false,
            file : null,
            errorMessage : error.message
        }

        return {
            success : true,
            file : {
                id : data.id,
                url : data.path
            }
        }
    }

    static async removeFile(filePath : string) : Promise<DeleteFileResonse>{

        const { data, error } = await supabase.storage
        .from('teste')
        .remove([filePath])

        if (error) return {
            success : false,
            file : null,
            errorMessage : error.message
        }
        return {
            success : true,
            file : {
                id : data[0].id,
                fileName : data[0].name
            }
        }

    }

}