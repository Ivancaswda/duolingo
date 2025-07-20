import {headers} from "next/headers";
import Stripe from "stripe";
import {stripe} from "@/lib/stripe";
import {NextResponse} from "next/server";
import {userSubscription} from "../../../../../db/schema";
import db from "../../../../../db/drizzle";
import {eq} from "drizzle-orm";

export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event;


    try {
        event =stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook error: ${error.message}`, {
            status: 400
        })
    }

    const session = event.data.object as Stripe.Checkout.Session
    if (event.type === 'checkout.session.completed') {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        console.log(session)
        console.log('it`s ession of stripee!!!')


        if (!session?.metadata?.userId) {
            return  new NextResponse("User Id is required", {status: 400})

        }

        console.log(subscription)
        console.log(session.metadata.userId)
        console.log(session)

        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

        await db.insert(userSubscription).values({
            userId: session.metadata.userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
        })



    }

    if (event.type === 'invoice.payment_succeeded') {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

        console.log(subscription)
        await db.update(userSubscription).set({
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
        }).where(eq(userSubscription.stripeSubscriptionId, subscription.id))
    }
    return  new NextResponse(null, {status: 200})

}