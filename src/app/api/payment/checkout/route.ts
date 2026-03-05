import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth/auth";
import { modules } from "@/domain";
import { getTipoCheckout } from "@/lib/billing";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const successUrl = `/obrigado?success=true`;

    if (!session?.user)
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const { priceId } = await request.json();

    if (!priceId)
      return NextResponse.json({ error: "priceId é obrigatório" }, { status: 400 });

    const tipoCheckout = getTipoCheckout(priceId, session.user.subscriptionId);

    const checkoutUrl = await modules.useCase.billing.createCheckoutSession.execute(successUrl, tipoCheckout, priceId);

    if (!checkoutUrl) 
      return NextResponse.json({ error: "Erro ao criar sessão de checkout" }, { status: 500 });

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Erro ao criar sessão de checkout:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}