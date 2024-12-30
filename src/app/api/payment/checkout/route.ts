import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe'

export async function POST(req: NextRequest, res : NextResponse) {
    // const { userId } = await req.json();
    try {
        if(!process.env.STRIPE_SECRET_KEY) throw new Error("Chave de API inexistente");
        
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: 'price_1QbYJYP3utzNziQ16HOt3QxG',
              quantity: 1,
            },
          ],
          mode: 'subscription',
          success_url: `${req.headers.get("origin")}/?success=true`,
          cancel_url: `${req.headers.get("origin")}/?canceled=true`,
        })
        return NextResponse.json(session.url!);
      } catch (err) {
        return new Response(`Erro ao criar página de pagamento : \n${err}`,{
            status:400,
        })
      }
    }