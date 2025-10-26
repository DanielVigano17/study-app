import { modules } from "@/domain";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { titulo, image, userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Usuário não fornecido" }, { status: 400 });
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