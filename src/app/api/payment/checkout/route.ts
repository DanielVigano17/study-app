import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth/auth";
import { modules } from "@/domain";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    let successUrl = `/app/`;
    let usuarioJaUtilizouFreeTrial = true;
    
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { priceId } = await request.json();

    if(!session.user.subscriptionId)
    {
      successUrl = "/on-boarding?priceId=" + priceId;
      usuarioJaUtilizouFreeTrial = false;
    }

    if (!priceId) {
      return NextResponse.json({ error: "priceId é obrigatório" }, { status: 400 });
    }

    const checkoutUrl = await modules.useCase.billing.createCheckoutSession.execute(successUrl, usuarioJaUtilizouFreeTrial, priceId);

    if (!checkoutUrl) {
      return NextResponse.json({ error: "Erro ao criar sessão de checkout" }, { status: 500 });
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Erro ao criar sessão de checkout:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}