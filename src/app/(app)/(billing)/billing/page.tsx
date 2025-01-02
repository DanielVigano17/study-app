"user server"

import { auth } from "@/auth";
import BillingHistory from "./_components/BillingHistory";
import SubscriptionOverview from "./_components/SubscriptionOverview";
import UsageStats from "./_components/UsageStats";
import { StripeRepository } from "@/repositories/stripeRepository";
import { CreateBillingPortal } from "@/domain/useCases/biling/createBillingPortal";
import { FindSubscription } from "@/domain/useCases/biling/findSubscription";
import { RetriveProduct } from "@/domain/useCases/biling/retriveProduct";

export default async function Page() {

    const paymentGateway = new StripeRepository();
    const createBillingPortal = new CreateBillingPortal(paymentGateway);
    const findSubscription = new FindSubscription(paymentGateway);
    const retriveProduct = new RetriveProduct(paymentGateway);

    const billingPortalUrl = await createBillingPortal.execute();
    const subscription = await findSubscription.execute();

    const product = await retriveProduct.execute(subscription?.metadata.productId);

    const subscriptionDetailsObject = {
      nameAssinatura : product?.name,
      metadata : product?.metadata, 
      status : subscription?.status || "",
      amount : subscription?.amount || 0
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Gerenciamento de Assinatura</h1>
        <div className="flex flex-col">
          <div className="flex flex-col lg:grid grid-cols-2 gap-4 mb-4">
            <SubscriptionOverview subscriptionDetails={subscriptionDetailsObject} url={billingPortalUrl}/>
            <UsageStats />
          </div>
          <div className="lg:col-span-2">
            <BillingHistory />
          </div>
        </div>
      </div>
    )
}
