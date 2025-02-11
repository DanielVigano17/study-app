import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import handleSubscriptionUpdated from "./handlesEvents/handleSubscriptionUpdated";

export async function POST(req : NextRequest) {
    const body = await req.text()
    const sig = req.headers.get('Stripe-Signature') as string
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

    let event : Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.WEBHOOK_KEY!);
    }
    catch (error : any) {
        console.log(error);
        return new Response(`Webhook Error: ${error.message}`, { status: 400 })
    }

    switch (event.type) {
        case 'customer.subscription.updated':
          handleSubscriptionUpdated(event.data.object)
          break
        default:
          console.log(`Unhandled event type ${event.type}`)
      }

    console.log(event.type);

    return NextResponse.json({ success: true }, { status: 200 });
}