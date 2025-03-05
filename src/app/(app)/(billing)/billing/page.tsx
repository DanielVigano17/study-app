"use server"

import { auth } from "@/auth";
import BillingHistory from "./_components/BillingHistory";
import SubscriptionOverview from "./_components/SubscriptionOverview";
import UsageStats from "./_components/UsageStats";
import { modules } from "@/domain";
import { redirect } from "next/navigation";

interface PageProps {
    searchParams: Promise<{
        error?: string;
        redirectTo?: string;
    }>
}

export default async function Page({ searchParams }: PageProps) {
    const params = await searchParams;
    const billingPortalUrl = await modules.useCase.billing.createBillingPortal.execute();
    const subscription = await modules.useCase.billing.findSubscription.execute();
    const product = await modules.useCase.billing.retriveProduct.execute(subscription?.metadata.productId);

    const subscriptionDetailsObject = {
        nameAssinatura: product?.name,
        metadata: product?.metadata,
        status: subscription?.status || "",
        amount: subscription?.amount || 0,
        nextBillingDate: subscription?.nextBillingDate
    }

    // Se a assinatura estiver ativa e houver uma URL de redirecionamento, redireciona
    if (subscription?.status === "active" && params.redirectTo) {
        redirect(params.redirectTo);
    }

    return (
        <div className="overflow-y-auto">
            <div className="container mx-auto px-4 pt-8 h-screen overflow-y-visible">
                <h1 className="text-3xl font-bold mb-8">Gerenciamento de Assinatura</h1>
                
                {params.error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700">{params.error}</p>
                    </div>
                )}

                <div className="flex flex-col pb-24">
                    <div className="flex flex-col lg:grid grid-cols-2 gap-4 mb-4">
                        <SubscriptionOverview subscriptionDetails={subscriptionDetailsObject} url={billingPortalUrl} />
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
