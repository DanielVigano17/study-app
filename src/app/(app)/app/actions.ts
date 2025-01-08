"use server"

import { Materia } from "@/domain/entities/Materia";
import { revalidatePath, revalidateTag } from "next/cache";
import { modules } from "@/domain";
import { CreateFileDTO } from "@/domain/interfaces/fileInterface";

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

    const res = await fetch(`http://localhost:3000/api/list-materias/${userId}`, {
        next: {
          tags: ['list-materias'],
        },
      });
      
    const materias : Materia[] = await res.json();

    return materias;
}

export async function createFileAction(data : CreateFileDTO) {

  const response = await fetch("http://localhost:3000/api/files/createFile", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
    
  const file = await response.json();

  if(!file) throw new Error("Erro ao salvar arquivo no banco de dados");

  return file;
}

