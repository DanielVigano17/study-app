"use client"

import BillingHistory from "./_components/BillingHistory";
import SubscriptionOverview from "./_components/SubscriptionOverview";
import UsageStats from "./_components/UsageStats";

export default function Page() {
    const handleSubmit = async (e : any) =>{
        e.preventDefault();
        const data = await fetch('http://localhost:3000/api/payment/checkout',{
            method: 'post'
        })
        const url = await data.json()
        window.location.href = url;
    }
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Gerenciamento de Assinatura</h1>
        <div className="flex flex-col">
          <div className="flex flex-col lg:grid grid-cols-2 gap-4 mb-4">
            <SubscriptionOverview />
            <UsageStats />
          </div>
          <div className="lg:col-span-2">
            <BillingHistory />
          </div>
        </div>
      </div>
    )
}
