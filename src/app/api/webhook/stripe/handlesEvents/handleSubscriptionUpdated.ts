import { modules } from "@/domain";
import Stripe from "stripe";

async function handleSubscriptionUpdated(data : Stripe.Subscription) : Promise<void>{
    await modules.useCase.billing.updateSubscription.execute(data.id as string, {
        metadata : {
            productId : data.items.data[0].price.product as string
        }
    });

    await modules.useCase.user.updateUserByCustomerId.execute(data.customer as string, {
        subscriptionId : data.id as string
    });
}

export default handleSubscriptionUpdated
