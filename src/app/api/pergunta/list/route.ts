import { modules } from "@/domain";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const materiaId = searchParams.get('materiaId');

        if (!materiaId) {
            return NextResponse.json(
                { error: "materiaId é obrigatório" },
                { status: 400 }
            );
        }

        const perguntas = await modules.useCase.flashcard.findMany.execute(materiaId);

        return NextResponse.json(perguntas);
    } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}
