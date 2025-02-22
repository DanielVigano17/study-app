"use server"

import { auth } from "@/auth";
import BillingHistory from "./_components/BillingHistory";
import SubscriptionOverview from "./_components/SubscriptionOverview";
import UsageStats from "./_components/UsageStats";
import { modules } from "@/domain";

export default async function Page() {

    const billingPortalUrl = await modules.useCase.billing.createBillingPortal.execute();
    const subscription = await modules.useCase.billing.findSubscription.execute();
    const product = await modules.useCase.billing.retriveProduct.execute(subscription?.metadata.productId);

    const subscriptionDetailsObject = {
      nameAssinatura : product?.name,
      metadata : product?.metadata, 
      status : subscription?.status || "",
      amount : subscription?.amount || 0
    }

    return (
      <div className="overflow-y-auto">
              <div className="container mx-auto px-4 pt-8 h-screen overflow-y-visible">
                <h1 className="text-3xl font-bold mb-8">Gerenciamento de Assinatura</h1>
                <div className="flex flex-col pb-24">
                  <div className="flex flex-col lg:grid grid-cols-2 gap-4 mb-4">
                    <SubscriptionOverview subscriptionDetails={subscriptionDetailsObject} url={billingPortalUrl}/>
                    <UsageStats />
                  </div>
                  <div className="lg:col-span-2">
                    <BillingHistory />
                  </div>
                </div>
              </div>
      </div>
    )
}
