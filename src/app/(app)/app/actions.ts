"use server"

import { CreateMateria } from "@/domain/useCases/materia/createMateria";
import { ListMaterias } from "@/domain/useCases/materia/listMaterias";
import { MateriaRepository } from "@/repositories/materiaRepository";
import { UserRepository } from "@/repositories/userRepository";
import { revalidatePath, revalidateTag } from "next/cache";

export async function novaMateriaAction(titulo : string, userId? : string) {
    const materiaRepository = new MateriaRepository();
    const createMateria = new CreateMateria(materiaRepository);

    if(!userId) return false;

    const materiaCriada = await createMateria.execute({userId, titulo});

    revalidatePath('/app');

    return materiaCriada;
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

