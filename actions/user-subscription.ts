'use server'


import {stripe} from "@/lib/stripe" ;
import {absoluteUrl} from "@/lib/utils";
import {getUserSubscription} from "../db/queries";
import getServerUser from "@/lib/auth-server";

const returnUrl = absoluteUrl('shop')


export const createStripeUrl = async () => {
    const user = await getServerUser()
    const userId = user?.userId
    const email = user?.email
    if (!userId) return

    const userSubscription = await getUserSubscription()

    if (userSubscription && userSubscription.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: returnUrl
        })

        return {data: stripeSession.url}
    }

    const stripeSession = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer_email: email,
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency:'EUR',
                    product_data: {
                        name: 'duolingo prem',
                        description: 'unlimited hearts'
                    },
                    unit_amount: 2000,
                    recurring: {
                        interval: 'month'
                    }
                }
            }
        ],
        metadata: {
            userId: userId
        },
        success_url: returnUrl,
        cancel_url: returnUrl
    })

    return {data: stripeSession.url}

}