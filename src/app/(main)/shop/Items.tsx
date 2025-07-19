'use client'
import React, {useTransition} from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {refillHearts} from "../../../../actions/user-progress";
import {useUser} from "@clerk/nextjs";
import {toast} from "sonner";
import {createStripeUrl} from "../../../../actions/user-subscription";
import {points_to_refill} from "../../../../constant";
import {useAuth} from "../../../../context/useAuth";
type  Props = {
    hearts: number,
    points: number,
    hasActiveSubscription: boolean
}


const Items = ({hearts, points, hasActiveSubscription}: Props) => {
    const [pending, startTransition] = useTransition()
    const {user} = useAuth()
    const onRefillHearts = () => {
        if (pending || hearts === 5 || points < points_to_refill) {
                return
        }

        startTransition(() => {
            refillHearts().catch(() => toast.error('smth went wrong'))
        })
    }

    const onUpgrade =() => {
        startTransition(() => {
            createStripeUrl().then((resp) => {
                if (resp.data) {
                    window.location.href = resp.data
                }
            }).catch(() => toast.error('smth went wrong with stripe payment'))
        })
    }


    return (
        <ul className='w-full'>
            <div className='flex items-center w-full p-4 gap-x-4 border-t-2'>
                <Image src='/hearts.png' alt='heart' height={60} width={60}/>
                <div className='flex-1'>
                    <p className='text-neutral-700 w-full p-4 lg:text-xl'>refil hearts</p>

                </div>
                <Button onClick={onRefillHearts} disabled={pending || hearts === 5 || points < points_to_refill}>
                    {hearts === 5 ? 'full' : <div className='flex items-center'>
                        <Image src='/points.png'
                                alt='points' width={40} height={40}
                        />
                        <p>{points_to_refill}</p>
                    </div>}
                </Button>
            </div>

            <div className='w-full p-4 gap-x-4 flex items-center border-t-2'>
                <Image src='/unlimited.png' alt={'unlimited'} width={60} height={60}/>
                <p className='text-neutral-700 w-full p-4 lg:text-xl'>Unlimited hearts</p>
            </div>

            <Button onClick={onUpgrade} disabled={pending}>
                {hasActiveSubscription ? 'settings' : 'upgrade'}
            </Button>
        </ul>
    )
}
export default Items
