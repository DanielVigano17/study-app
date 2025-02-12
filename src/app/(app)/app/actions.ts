"use server"

import { Materia } from "@/domain/entities/Materia";
import { revalidatePath, revalidateTag } from "next/cache";
import { modules } from "@/domain";
import { CreateFileDTO } from "@/domain/interfaces/fileInterface";
import { File } from "@/domain/entities/File";
import { CreatePerguntaDTO } from "@/domain/interfaces/perguntaInterface";
import { Pergunta } from "@/domain/entities/Pergunta";
type novaMateriaData={
  titulo : string
  image? : string
}

export async function novaMateriaAction({titulo,image} : novaMateriaData, userId? : string) {
    try{
      if(!userId) return false;
  
      const materiaCriada = await modules.useCase.materia.createMateria.execute({userId, titulo, image});
  
      revalidatePath('/app');
      return materiaCriada;

    }catch(e){
      console.log(e);
    }
    return false
}

export async function listMateriasAction(userId? : string) {
    if(!userId) return false;

    const res = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/list-materias/${userId}`, {
        next: {
          tags: ['list-materias'],
        },
      });
      
    const  {materias} : {materias : Materia[]} = await res.json();

    return materias;
}

export async function createFileAction(data : CreateFileDTO) : Promise<File> {

  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/files/createFile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
    
  const {file} = await response.json();

  if(!file) throw new Error("Erro ao salvar arquivo no banco de dados");
  return file;
}

export async function createPerguntaAction(data : CreatePerguntaDTO) : Promise<Pergunta> {

  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/pergunta/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
    
  const {pergunta} = await response.json();

  if(!pergunta) throw new Error("Erro ao cadastrar pergunta");
  return pergunta;
}

export async function findManyPerguntasAction(materiaId : string) : Promise<Pergunta[]> {

  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/pergunta/getPerguntas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(materiaId),
  });
    
  const {perguntas} = await response.json();

  if(!perguntas) throw new Error("Erro ao buscar perguntas");
  return perguntas;
}

export async function listFilesAction(materiaId : string) {

  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/files/listFiles`, {
    method: 'POST',
    next : {
      tags: ['listFiles']
    },
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(materiaId),
  });
    
  const {files} = await response.json();

  if(!files) throw new Error("Erro ao salvar arquivo no banco de dados");

  return files;
}

