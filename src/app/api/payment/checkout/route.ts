import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth/auth";
import { modules } from "@/domain";
import { EnumTipoCheckout } from "@/domain/enums/enum-tipo-checkout";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    let successUrl = `/obrigado?success=true`;
    let usuarioJaUtilizouFreeTrial = true;
    
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { priceId } = await request.json();

    if(!session.user.subscriptionId)
    {
      successUrl = "/obrigado?success=true";
      usuarioJaUtilizouFreeTrial = false;
    }

    if (!priceId) {
      return NextResponse.json({ error: "priceId é obrigatório" }, { status: 400 });
    }

    const checkoutUrl = await modules.useCase.billing.createCheckoutSession.execute(successUrl, EnumTipoCheckout.FREE_TRIAL , priceId);

    if (!checkoutUrl) {
      return NextResponse.json({ error: "Erro ao criar sessão de checkout" }, { status: 500 });
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Erro ao criar sessão de checkout:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}