// export { auth as middleware } from "@/auth" 

import { NextRequest, NextResponse } from "next/server";
import { checkSubscription } from "@/middleware/checkSubscription";
import { auth } from "@/auth";

export const config = {
    matcher: [
        // Rotas que precisam de assinatura
        "/app/(app)/flashcards/:path*",
        "/app/(app)/questionarios/:path*", 
        "/app/(app)/materias/:path*",
        "/app/(app)/arquivos/:path*",
        // Excluir rotas que não precisam de verificação
        "/((?!api|_next/static|_next/image|favicon.ico|billing|login|$).*)",
    ]
}

export async function middleware(request: NextRequest) {
    // Primeiro verifica autenticação
    const session = await auth();
    
    if (!session) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Depois verifica assinatura
    return checkSubscription(request);
}