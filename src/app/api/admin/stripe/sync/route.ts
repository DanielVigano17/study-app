import { modules } from "@/domain";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const {password} = await request.json();

        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ error: "Senha inválida" }, { status: 401 });
        }

        const results = await modules.useCase.billing.syncProducts.syncProducts();

        return NextResponse.json({
            message: "Sincronização concluída",
            results
        });

    } catch (error) {
        console.error("Erro na sincronização:", error);
        return NextResponse.json(
            { error: "Erro ao sincronizar produtos" },
            { status: 500 }
        );
    }
} 