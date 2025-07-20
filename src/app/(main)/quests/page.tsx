import React from 'react'
import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import {getTopTenUsers, getUserProgress, getUserSubscription} from "../../../../db/queries";
import {redirect} from "next/navigation";
import FeedWrapper from "@/components/FeedWrapper";
import Image from "next/image";
import Items from "@/app/(main)/shop/Items";
import {currentUser} from "@clerk/nextjs/server";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import {Progress} from "@/components/ui/progress";
import Promo from "@/app/(main)/learn/Promo";
import Quests from "@/components/Quests";
import {quests} from "../../../../constant";
import getServerUser from "@/lib/auth-server";




const Page = async () => {
    const user = await getServerUser()
    if (!user) return
    const userProgressData = await getUserProgress()
    const userSubscriptionData = await getUserSubscription()
    const topTenUsersData = await getTopTenUsers()
    if (!userProgressData || !userProgressData.activeCourse) {
        redirect('/courses')
    }


    return (
        <div className='flex flex-row-reverse gap-[48px] px-6'>
            <StickyWrapper>
                <UserProgress activeCourse={userProgressData.activeCourse}
                              hearts={userProgressData.hearts}
                              points={userProgressData.points}
                              hasActiveSubscription={!!userSubscriptionData?.isActive}
                />
                {!!userSubscriptionData?.isActive && <Promo/>}

            </StickyWrapper>

            <FeedWrapper>
                <div className='flex flex-col items-center w-full'>
                    <Image src='https://cdn-icons-png.flaticon.com/512/1409/1409014.png' alt='shop' width={90} height={90}
                    />
                    <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>
                        Задания
                    </h1>
                    <p className='text-muted-foreground text-center text-lg mb-6'>
                       Выполните задания получая знания
                    </p>

                    <ul className='w-full'>
                        {quests.map((quest, index) => {
                            const progress = (userProgressData.points / quest.value) * 100
                        return (
                            <div key={index} className='flex items-center w-full p-4 gap-x-4 border-t-2'>
                                <Image src='https://d35aaqx5ub95lt.cloudfront.net/images/gems/45c14e05be9c1af1d7d0b54c6eed7eee.svg'
                                       alt='points'
                                       width={60}
                                       height={60}
                                />
                                <div className='flex flex-col gap-y-2 w-full'>
                                    <p className='text-neutral-700 text-xl font-bold'>
                                        {quest.title}
                                    </p>
                                    <Progress value={progress} className='h-3'/>
                                </div>
                            </div>
                        )
                        })}
                    </ul>

                </div>
            </FeedWrapper>

        </div>
    )
}
export default Page
