
import React from 'react'
import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import {getUserProgress, getUserSubscription} from "../../../../db/queries";
import {redirect} from "next/navigation";
import FeedWrapper from "@/components/FeedWrapper";
import Image from "next/image";
import Items from "@/app/(main)/shop/Items";
import {currentUser} from "@clerk/nextjs/server";
import Promo from "@/app/(main)/learn/Promo";
import Quests from "@/components/Quests";
import getServerUser from "@/lib/auth-server";


const Page = async () => {
    const user = await getServerUser()
    if (!user) return
    const userProgressData = await getUserProgress()
    const userSubscriptionData = await getUserSubscription()

    console.log(userSubscriptionData)

    if (!userProgressData || !userProgressData.activeCourse) {
        redirect('/courses')
    }


    return (
        <div className='flex flex-row-reverse  justify-end w-[100%] gap-[48px] px-6'>
            <StickyWrapper>
                <UserProgress activeCourse={userProgressData.activeCourse}
                              hearts={userProgressData.hearts}
                              points={userProgressData.points}
                              hasActiveSubscription={!!userSubscriptionData?.isActive}
                />
                {!!userSubscriptionData?.isActive && <Promo/>}
                <Quests points={userProgressData.points}/>
            </StickyWrapper>

            <FeedWrapper>
                <div className='flex flex-col items-center w-[100%]'>
                    <Image src='https://d35aaqx5ub95lt.cloudfront.net/vendor/0e58a94dda219766d98c7796b910beee.svg' alt='shop' width={90} height={90}
                    />
                    <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>
                       Магазин
                    </h1>
                    <p className='text-muted-foreground text-center text-lg mb-6'>
                       Потрать свою энергию на сердца
                    </p>
                    <Items hearts={userProgressData.hearts} points={userProgressData.points} hasActiveSubscription={false}/>
                </div>
            </FeedWrapper>

        </div>
    )
}
export default Page
