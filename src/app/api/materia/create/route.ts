import { modules } from "@/domain";
import { NextResponse } from "next/server";
import { checkFeatureLimits } from "@/middleware/checkFeatureLimits";

export async function POST(request: Request) {
  try {
    const { titulo, image, userId, subscriptionId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Usuário não fornecido" }, { status: 400 });
    }

    const limitCheck = await checkFeatureLimits(request, 'materias', userId, subscriptionId);
    if (limitCheck.status !== 200) {
      return limitCheck;
    }

    const materia = await modules.useCase.materia.createMateria.execute({
      userId,
      titulo,
      image,
    });

    return NextResponse.json({ materia });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar matéria" },
      { status: 500 }
    );
  }
} 