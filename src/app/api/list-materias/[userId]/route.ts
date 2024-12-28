// app/api/get-data/route.ts
import { ListMaterias } from '@/domain/useCases/materia/listMaterias';
import { MateriaRepository } from '@/repositories/materiaRepository';
import { UserRepository } from '@/repositories/userRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: Request , { params }: { params: Promise<{ userId: string }> }) {
    const userId = (await params).userId

    const materiaRepository = new MateriaRepository();
    const userRepository = new UserRepository();
    const listMaterias = new ListMaterias(materiaRepository,userRepository);

    if(!userId) return false;

    const materias = await listMaterias.execute(userId);

    return Response.json( materias || false )
}

