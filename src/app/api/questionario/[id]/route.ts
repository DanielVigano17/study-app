import { modules } from "@/domain";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const questionario = await modules.useCase.questionario.getById.execute(id);
        
        if (!questionario) {
            return NextResponse.json(
                { status: 404, message: "Questionário não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json({ status: 200, questionario });
    } catch (error) {
        console.error("Erro ao buscar questionário:", error);
        return NextResponse.json(
            { status: 500, message: "Erro ao buscar questionário" },
            { status: 500 }
        );
    }
} 