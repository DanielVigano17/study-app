import { redirect } from "next/navigation";
import { auth } from "../../../auth/auth";
import { modules } from "@/domain";

export default async function ContinueCheckoutPage({ searchParams }: { searchParams: Promise<{ priceId?: string }> }) {
  const session = await auth();
  const priceId = (await searchParams)?.priceId;

  if (!session?.user) {
    redirect(`/login?redirectTo=/continue-checkout${priceId ? `?priceId=${encodeURIComponent(priceId)}` : ""}`);
  }

  if (!priceId) {
    redirect("/app/billing");
  }

  const url = await modules.useCase.billing.createCheckoutSession.execute(priceId);

  if (!url) {
    redirect("/app/billing?error=checkout_url");
  }

  redirect(url!);
}
