// app/api/get-data/route.ts
import { modules } from '@/domain';

export async function GET(request: Request , { params }: { params: Promise<{ userId: string }> }) {
    const userId = (await params).userId

    if(!userId) return;

    const materias = await modules.useCase.materia.listMaterias.execute(userId);

    return Response.json( {materias} )
}

