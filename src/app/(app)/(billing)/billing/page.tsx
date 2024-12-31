"user server"

import { auth } from "@/auth";
import BillingHistory from "./_components/BillingHistory";
import SubscriptionOverview from "./_components/SubscriptionOverview";
import UsageStats from "./_components/UsageStats";
import Stripe from "stripe";

export default async function Page() {

    const session = await auth();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

    const customerId = session?.user.customerId

    if(!customerId) return null;

    const portalBilling = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: 'https://example.com/account',
    });

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Gerenciamento de Assinatura</h1>
        <div className="flex flex-col">
          <div className="flex flex-col lg:grid grid-cols-2 gap-4 mb-4">
            <SubscriptionOverview url={portalBilling.url}/>
            <UsageStats />
          </div>
          <div className="lg:col-span-2">
            <BillingHistory />
          </div>
        </div>
      </div>
    )
}
