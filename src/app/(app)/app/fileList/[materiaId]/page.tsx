"use client"

import { use, useEffect, useState } from "react";
import { FileList } from "../_components/fileList"
import { listFilesAction } from "../../actions";
import { File } from "@/domain/entities/File";
import { FileFilters } from "../_components/fileFilters";
import DialogNewFile from "../_components/DialogNewFile";
import { Share, Download, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { File as FileIcon } from 'lucide-react'
import Link from 'next/link'

export default function FilesPages({params} : {params : Promise<{materiaId : string}>}) {
  const { materiaId } = use(params);
  
  const [files,setFiles] = useState<File[]>([])
  const [fetched, setFetched] = useState<boolean>(false)
  console.log(files);
 
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
          <h1 className="text-2xl font-semibold">Arquivos</h1>
          <DialogNewFile materiaId={materiaId} setFiles={handleSetState} fileList={files}/>
        </div>
        <FileFilters materiaId={materiaId} />

        {(files.length <= 0 && fetched) && (
        <span className='flex w-full mt-12 justify-center items-center'>Nenhum Arquivo Cadastrado</span>
        )}

        <div className="space-y-2 h-96">
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
                  <div className="text-sm text-gray-500"><Link href={file.url}>Vizualizar</Link></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
              <Button variant="destructive" size="sm" className="gap-2">
                <Share className="w-4 h-4" />
                SHARE
              </Button>
              <Button size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                DOWNLOAD
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
        </div>
        ))}
      </div>
      </div>
  )
}

