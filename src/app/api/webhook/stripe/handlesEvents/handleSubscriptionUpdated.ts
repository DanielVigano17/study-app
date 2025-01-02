import Stripe from "stripe";

function handleSubscriptionUpdated(data : Stripe.Subscription) : void{
    console.log(data);
}

export default handleSubscriptionUpdated
