import { auth } from "@/auth";
import { modules } from "@/domain";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const invoices = await modules.useCase.billing.listInvoices.execute();
        return NextResponse.json(invoices);
    } catch (error) {
        console.error("Erro ao listar faturas:", error);
        return NextResponse.json(
            { error: "Erro ao listar faturas" },
            { status: 500 }
        );
    }
} 