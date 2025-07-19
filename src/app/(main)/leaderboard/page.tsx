import React from 'react'
import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import {getTopTenUsers, getUserProgress, getUserSubscription} from "../../../../db/queries";
import {redirect} from "next/navigation";
import FeedWrapper from "@/components/FeedWrapper";
import Image from "next/image";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import Promo from "@/app/(main)/learn/Promo";
import Quests from "@/components/Quests";
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

    if (!topTenUsersData || topTenUsersData.length === 0) {
        return
    }

    console.log(topTenUsersData)

    return (
        <div className='flex flex-row-reverse gap-[48px] px-6'>
            <StickyWrapper>
                <UserProgress activeCourse={userProgressData.activeCourse}
                              hearts={userProgressData.hearts}
                              points={userProgressData.points}
                              hasActiveSubscription={!!userSubscriptionData?.isActive}
                />
                {!!userSubscriptionData?.isActive && <Promo/>}
                <Quests points={userProgressData?.points}/>
            </StickyWrapper>

            <FeedWrapper>
                <div className='flex flex-col items-center w-full'>
                    <Image src='/leaderboard.png' alt='shop' width={90} height={90}
                    />
                    <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>
                        Leaderboard
                    </h1>
                    <p className='text-muted-foreground text-center text-lg mb-6'>
                        see where u   stand among other member from the comminity
                    </p>
                    <Separator>
                        {topTenUsersData.length === 1 ? <div className='text items-center flex w-full p-2 px-4 rounded-xl hover:bg-gray-200/50'
                                 >

                                <p className='font-bold text-lime-700 mr-4'>{1}</p>
                                <Avatar className='border bg-green-500 h-12 w-12 ml-3 mr-6'>
                                    <AvatarImage className='object-cover' src={userProgressData.userImageSrc}/>
                                </Avatar>
                                <p className='font-bold text-neutral-500'>{userProgressData.userName}</p>
                                <p className='text-muted-foreground'>{userProgressData.points} XP</p>
                            </div> : topTenUsersData?.map((item, index) => (
                                <div className='text items-center flex w-full p-2 px-4 rounded-xl hover:bg-gray-200/50'
                                     key={index}>

                                    <p className='font-bold text-lime-700 mr-4'>{index + 1}</p>
                                    <Avatar className='border bg-green-500 h-12 w-12 ml-3 mr-6'>
                                        <AvatarImage className='object-cover' src={item.userImageSrc}/>
                                        <AvatarFallback>F</AvatarFallback>
                                    </Avatar>
                                    <p className='font-bold text-neutral-500'>{item.userName}</p>
                                    <p className='text-muted-foreground'>{item.points} XP</p>
                                </div>
                            ))}
                    </Separator>

                </div>
            </FeedWrapper>

        </div>
    )
}
export default Page
