// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import db from "../../../../../db/drizzle";
import {userSubscription} from "../../../../../db/schema";
import {eq} from "drizzle-orm";



export const config = {
    api: {
        bodyParser: false,
    },
};

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2024-04-10",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    const rawBody = await req.arrayBuffer();
    const bodyBuffer = Buffer.from(rawBody);
    const sig = req.headers.get("stripe-signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(bodyBuffer, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook signature error:", err);
        return new NextResponse("Webhook Error", { status: 400 });
    }
    console.log('agagasg')
    console.log(event)
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)


        console.log('payment success     ugadshgafsh !!!')
        const userId = session.metadata?.userId;

        if (userId) {
            await db.insert(userSubscription).values({
                userId: session.metadata?.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)

            })
        }
    }

    if (event.type === 'invoice.payment_succeeded') {
        const subscription = event.data.object as Stripe.Invoice
        const stripeSub = await stripe.subscriptions.retrieve(subscription.subscription as string)

        await db.update(userSubscription).set({
            stripePriceId: stripeSub.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(stripeSub.current_period_end * 1000)
        }).where(eq(userSubscription.stripeSubscriptionId, stripeSub.id))
    }
    if (event.type === "customer.subscription.deleted") {
        const subscription = event.data.object as Stripe.Subscription;

        await db.delete(userSubscription).where(
            eq(userSubscription.stripeSubscriptionId, subscription.id)
        );
    }

    return NextResponse.json(null, { status:200 });
}
