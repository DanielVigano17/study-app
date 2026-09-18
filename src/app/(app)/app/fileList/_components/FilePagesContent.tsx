"use client"
import { use, useContext, useEffect, useState } from "react";
import { createManyFlashcardAction, createQuestionarioByAiAction, deleteFileAction, listFilesAction } from "../../actions";
import { File } from "@/domain/entities/File";
import { FileFilters } from "../_components/fileFilters";
import DialogNewFile from "../_components/DialogNewFile";
import { MoreVertical, Trash, MoveLeft, Zap, BookText, Pencil, Download } from 'lucide-react'
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
  const [generatingQuestionarioUrl, setGeneratingQuestionarioUrl] = useState<string | null>(null)

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
    setGeneratingQuestionarioUrl(url);
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
      setGeneratingQuestionarioUrl(null);
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
  <div className="mb-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <Link href={`/app/`}>
        <MoveLeft className="h-5 w-5" />
      </Link>

      <h1 className="text-2xl font-semibold">
        Arquivos
      </h1>
    </div>

    <DialogNewFile
      materiaId={materiaId}
      setFiles={handleSetState}
      fileList={files}
    />
  </div>

  <FileFilters materiaId={materiaId} />

  {files.length <= 0 && fetched && (
    <span className="mt-12 flex w-full items-center justify-center">
      Nenhum Arquivo Cadastrado
    </span>
  )}

  <div className="h-96 space-y-2 overflow-y-auto">
    {files &&
      files.map((file) => {
        const isGeneratingFlashcards = generatingFileUrl === file.url;
        const isGeneratingQuestionario =
          generatingQuestionarioUrl === file.url;

        const isGenerating =
          isGeneratingFlashcards || isGeneratingQuestionario;

        return (
          <div
            key={file.id}
            className={`flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border bg-white p-4 ${
              isGenerating ? "animate-pulse" : ""
            }`}
          >
            {isGenerating ? (
              // Skeleton loading
              <>
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="h-8 w-8 shrink-0 animate-pulse rounded-lg bg-gray-200" />

                  <div className="min-w-0 space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <div className="hidden h-8 w-40 animate-pulse rounded bg-gray-200 md:block" />
                  <div className="hidden h-8 w-36 animate-pulse rounded bg-gray-200 md:block" />
                  <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
                </div>
              </>
            ) : (
              // Normal content
              <>
                {/* Informações do arquivo */}
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  {/* Ícone */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                    <FileIcon className="h-4 w-4" />
                  </div>

                  {/* Nome e link */}
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">
                      {file.fileName}
                    </div>

                    <div className="truncate text-sm text-gray-500">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={file.url}
                      >
                        Visualizar
                      </a>
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    onClick={() =>
                      handleGenerateQuestionario(file.url)
                    }
                    variant="outline"
                    size="sm"
                    className="hidden gap-2 md:flex"
                    disabled={!!generatingQuestionarioUrl}
                  >
                    <BookText className="h-4 w-4" />
                    Gerar Questionário
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        Ações
                      </DropdownMenuLabel>

                      <DropdownMenuSeparator />

                      {/* <DropdownMenuItem className="cursor-pointer">
                        <Pencil className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem> */}

                      <DropdownMenuItem className="cursor-pointer">
                        <Download className="h-4 w-4" />
                        Download
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          handleGenerateFlashcards(file.url)
                        }
                        disabled={!!generatingFileUrl}
                        className="cursor-pointer"
                      >
                        <Zap className="h-4 w-4" />
                        Gerar Flashcards
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          handleGenerateQuestionario(file.url)
                        }
                        disabled={!!generatingQuestionarioUrl}
                        className="cursor-pointer"
                      >
                        <BookText className="h-4 w-4" />
                        Gerar Questionário
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="flex md:hidden" />

                      <DropdownMenuItem
                        onClick={() =>
                          handleDelete(
                            file.id,
                            HelperFile.getFilePathFromUrl(file.url)
                          )
                        }
                        className="flex cursor-pointer"
                      >
                        <Trash className="h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
          </div>
        );
      })}
  </div>
</div>
  )
}

