import { redirect } from "next/navigation";
import { auth } from "../../../auth/auth";
import { modules } from "@/domain";
import { getTipoCheckout } from "@/lib/billing";

export default async function ContinueCheckoutPage({ searchParams }: { searchParams: Promise<{ priceId?: string }> }) {
  const session = await auth();
  const priceId = (await searchParams)?.priceId;
  const successUrl = "/obrigado?success=true";

  if (!session?.user) {
    redirect(`/login?redirectTo=/continue-checkout${priceId ? `?priceId=${encodeURIComponent(priceId)}` : ""}`);
  }

  if (!priceId) {
    redirect("/app/billing");
  }

  const tipoCheckout = getTipoCheckout(priceId, session.user.subscriptionId);

  const url = await modules.useCase.billing.createCheckoutSession.execute(successUrl, tipoCheckout, priceId);

  if (!url) {
    redirect("/app/billing?error=checkout_url");
  }

  redirect(url!);
}
