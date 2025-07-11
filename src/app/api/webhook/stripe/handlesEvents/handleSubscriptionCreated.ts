import { modules } from "@/domain";
import Stripe from "stripe";

async function handleSubscriptionCreated(data : Stripe.Subscription) : Promise<void>{
    await modules.useCase.billing.updateSubscription.execute(data.id as string, {
        metadata : {
            productId : data.items.data[0].price.product as string
        }
    });
}

export default handleSubscriptionCreated
