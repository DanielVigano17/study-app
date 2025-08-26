"use client"
import { use, useContext, useEffect, useState } from "react";
import { createManyFlashcardAction, createQuestionarioByAiAction, deleteFileAction, listFilesAction } from "../../actions";
import { File } from "@/domain/entities/File";
import { FileFilters } from "../_components/fileFilters";
import DialogNewFile from "../_components/DialogNewFile";
import { MoreVertical, Trash, MoveLeft, Zap, Loader2, X } from 'lucide-react'
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
import { ApplicationContext } from "@/app/_context/app.context";
import HelperFile from "@/helpers/helper-file";
import { useToast } from "@/hooks/use-toast"

export default function FilesPagesContent({params} : {params : Promise<{materiaId : string}>}) {
  const { materiaId } = use(params);
  const { session } = useContext(ApplicationContext);
  const { toast } = useToast();

  const [files,setFiles] = useState<File[]>([])
  const [fetched, setFetched] = useState<boolean>(false)
  const [generatingFileUrl, setGeneratingFileUrl] = useState<string | null>(null)

  const handleDelete = async (fileId : string, filePath : string) => {
      const fileRemoved = await deleteFileAction(fileId,filePath);
      
      if(fileRemoved){
        const filesSemExcluido = files?.filter(item => item.id != fileRemoved.id);
        setFiles(filesSemExcluido);
      }
  }

  const handleGenerateFlashcards = async (url : string) => {
    setGeneratingFileUrl(url);
    try {
      await createManyFlashcardAction(url, session?.user?.id!, session?.user?.subscriptionId!, materiaId);
      toast({
        title: "Flashcards gerados com sucesso!",
        description: "Os flashcards foram gerados com sucesso!",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar os flashcards.",
        description: "Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setGeneratingFileUrl(null);
    }
  }

  const handleGenerateQuestionario = async (url : string) => {
    setGeneratingFileUrl(url);
    try {
      await createQuestionarioByAiAction(url, session?.user?.id!, session?.user?.subscriptionId!, materiaId);
      toast({
        title: "Questionário gerado com sucesso!",
        description: "O questionário foi gerado com sucesso!",
        variant: "default"
      });
    }
    catch(error){
      toast({
        title: "Erro ao gerar o questionário.",
        description: "Tente novamente.",
        variant: "destructive"
      });
    }
    finally{
      setGeneratingFileUrl(null);
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
    <div>
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
              <Button onClick={() => handleDelete(file.id, HelperFile.getFilePathFromUrl(file.url))} variant="destructive" size="sm" className="gap-2 hidden md:flex">
                <Trash className="w-4 h-4" />
                EXCLUIR
              </Button>

              <Button onClick={() => handleGenerateQuestionario(file.url)} variant="outline" size="sm" className="gap-2 hidden md:flex" disabled={!!generatingFileUrl}>
                {generatingFileUrl === file.url ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    GERANDO...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    GERAR QUESTIONÁRIO
                  </>
                )}
              </Button>

              <Button onClick={() => handleGenerateFlashcards(file.url)} variant="outline" size="sm" className="gap-2 hidden md:flex" disabled={!!generatingFileUrl}>
                {generatingFileUrl === file.url ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    GERANDO...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    GERAR FLASHCARDS
                  </>
                )}
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
                  <DropdownMenuItem onClick={() => handleGenerateFlashcards(file.url)} disabled={!!generatingFileUrl} className="cursor-pointer">
                    {generatingFileUrl === file.url ? 'Gerando...' : 'Gerar Flashcards'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="flex md:hidden"/>
                  <DropdownMenuItem onClick={() => handleDelete(file.id, HelperFile.getFilePathFromUrl(file.url))} className="flex cursor-pointer md:hidden">Excluir</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </div>
        ))}
      </div>
    </div>
  )
}

