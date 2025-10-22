import { ApplicationPage } from "@/components/page-content/ApplicationPage";
import { auth } from "../../../../../auth/auth";
import OnboardingStepper from "./_components/OnboardingStepper";
import { modules } from "@/domain";
import Stripe from "stripe";

const OnBoardingPage = async ({ searchParams }: { searchParams: Promise<{ priceId?: string }> }) => {
  const params = await searchParams;
  const priceId = params?.priceId;
  const session = await auth();
  let price : Stripe.Price | null = null;

  if(priceId) {
    price = await modules.useCase.billing.getPrice.execute({priceId: priceId});
  }

  return (
    <ApplicationPage pageKey="onboarding-page" authPage>
      <OnboardingStepper userId={session?.user?.id}/>
    </ApplicationPage>
  )
}

export default OnBoardingPage;
