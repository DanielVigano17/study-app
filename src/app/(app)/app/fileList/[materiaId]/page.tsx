"use client"

import { use, useEffect, useState } from "react";
import { deleteFileAction, listFilesAction } from "../../actions";
import { File } from "@/domain/entities/File";
import { FileFilters } from "../_components/fileFilters";
import DialogNewFile from "../_components/DialogNewFile";
import { Share, Download, MoreVertical, Trash, MoveLeft } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { File as FileIcon } from 'lucide-react'
import Link from "next/link";

export default function FilesPages({params} : {params : Promise<{materiaId : string}>}) {
  const { materiaId } = use(params);
  
  const [files,setFiles] = useState<File[]>([])
  const [fetched, setFetched] = useState<boolean>(false)

  function getFilePathFromUrl(fileUrl : string) {
    const urlObj = new URL(fileUrl);
    const pathParts = urlObj.pathname.split('/');

    const filename = pathParts[pathParts.length - 1];

    return `${filename}`;
  }

  const handleDelete = async (fileId : string, filePath : string) => {
      const fileRemoved = await deleteFileAction(fileId,filePath);
      
      if(fileRemoved){
        const filesSemExcluido = files?.filter(item => item.id != fileRemoved.id);
        setFiles(filesSemExcluido);
        console.log(filesSemExcluido);
      }
  }
 
  useEffect(() => {
    async function fetchFiles() {
      try{
        const listFiles = await listFilesAction(materiaId);
        if(listFiles.length > 0) setFiles(listFiles);
        setFetched(true);
      }catch(e){
        console.log(e)
      }
    }
    fetchFiles()
  }, [])

  const handleSetState = (file : File) =>{
    setFiles(prevFiles => [...prevFiles, file]);
  }

  return (
      <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href={`/app/`}><MoveLeft className="w-5 h-5"/></Link >
            <h1 className="text-2xl font-semibold">Arquivos</h1>
          </div>
          <DialogNewFile materiaId={materiaId} setFiles={handleSetState} fileList={files}/>
        </div>
        <FileFilters materiaId={materiaId} />

        {(files.length <= 0 && fetched) && (
        <span className='flex w-full mt-12 justify-center items-center'>Nenhum Arquivo Cadastrado</span>
        )}

        <div className="space-y-2 h-96">
          {/* {files.length > 0 && <iframe src={files[0].url} width="100%" height="600px">

          </iframe>
          } */}
          {files && files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileIcon className='h-4 w-4'/>
                </div>
                <div>
                  <div className="font-medium">
                    {file.fileName}
                  </div>
                  <div className="text-sm text-gray-500"><a target="_blank" href={file.url}>Vizualizar</a></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
              <Button onClick={() => handleDelete(file.id, getFilePathFromUrl(file.url))} variant="destructive" size="sm" className="gap-2 hidden md:flex">
                <Trash className="w-4 h-4" />
                EXCLUIR
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">Editar</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Download</DropdownMenuItem>
                  <DropdownMenuSeparator className="flex md:hidden"/>
                  <DropdownMenuItem onClick={() => handleDelete(file.id, getFilePathFromUrl(file.url))} className="flex cursor-pointer md:hidden">Excluir</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </div>
        ))}
      </div>
      </div>
  )
}

