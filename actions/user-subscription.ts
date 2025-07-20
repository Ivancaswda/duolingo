'use server'
// /actions/user-subscription.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";
import getServerUser from "@/lib/auth-server";


const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2024-04-10",
});
export async function createStripeUrl() {
    const user = await getServerUser();
    if (!user) {
        throw new Error("Unauthorized");
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price: process.env.STRIPE_PRICE_ID!, // ✅ НЕ число 20, а `price id` из Stripe
                quantity: 1,
            },
        ],
        mode: "payment", // или "payment" если одноразовая
        success_url: `${process.env.NEXT_PUBLIC_URL_APP}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL_APP}/failed`,
        metadata: {
            userId: user.userId,
            email: user.email || "",
        },
    });

    return { data: session.url };
}

