"user server"

import { auth } from "@/auth";
import BillingHistory from "./_components/BillingHistory";
import SubscriptionOverview from "./_components/SubscriptionOverview";
import UsageStats from "./_components/UsageStats";
import { StripeRepository } from "@/repositories/stripeRepository";
import { CreateBillingPortal } from "@/domain/useCases/biling/createBillingPortal";

export default async function Page() {

    const paymentGateway = new StripeRepository();
    const createBillingPortal = new CreateBillingPortal(paymentGateway);
    const billingPortalUrl = await createBillingPortal.execute();

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Gerenciamento de Assinatura</h1>
        <div className="flex flex-col">
          <div className="flex flex-col lg:grid grid-cols-2 gap-4 mb-4">
            <SubscriptionOverview url={billingPortalUrl}/>
            <UsageStats />
          </div>
          <div className="lg:col-span-2">
            <BillingHistory />
          </div>
        </div>
      </div>
    )
}
