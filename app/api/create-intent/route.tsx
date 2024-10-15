import { stat } from "fs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2023-08-16"
})

export async function POST(request: Request) {
    const date: any =await request.json();
    const amount = date.amount;
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount:Number(amount)*100,
            currency: "usd",
        });
        return NextResponse.json(paymentIntent.client_secret,{status: 200})
    }
    catch(err:any){
        return NextResponse.json(err.message,{status: 400})
    }
}