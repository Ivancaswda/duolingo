import {
    getCourseProgress,
    getLessonPercentage,
    getUnits,
    getUserProgress,
    getUserSubscription
} from "../../../../db/queries";

import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import FeedWrapper from "@/components/FeedWrapper";
import HeaderLingo from "@/components/HeaderLingo";
import Unit from "@/app/(main)/learn/Unit";
import React from "react";
import {currentUser} from "@clerk/nextjs/server";
import Promo from "@/app/(main)/learn/Promo";
import Quests from "@/components/Quests";
import {Loader2Icon} from "lucide-react";
import { auth} from "@clerk/nextjs/server";
import getServerUser from "@/lib/auth-server";

const LearnPage = async () => {
    const user = await getServerUser()
    const userId = user?.userId
    console.log(userId)
    console.log(user)
    if (!user) {
        return <Loader2Icon className='animate-spin text-green-500'/>
    }
    const userProgressData = await getUserProgress();
     console.log(userProgressData)


    const courseProgressData = await getCourseProgress();
     console.log(courseProgressData)

    const unitsData = await getUnits()
    console.log(unitsData)

    const lessonPercentageData = await getLessonPercentage();
    console.log(lessonPercentageData)

    const userSubscriptionData = await getUserSubscription()

    return (
           <div className='flex flex-row-reverse gap-[48px] px-6'>
              <StickyWrapper>
                <UserProgress
                    activeCourse={userProgressData?.activeCourse}
                    hearts={userProgressData?.hearts}
                    points={userProgressData?.points}
                    hasActiveSubscription={!!userSubscriptionData?.isActive}
                />
                {!!userSubscriptionData?.isActive && <Promo/>}
                <Quests points={userProgressData?.points}/>
            </StickyWrapper>
            <FeedWrapper>
        <div className='flex-col flex gap-14 items-center'>


                {unitsData?.map((unit) => (
                    <div key={unit?.id} className={'mb-10'}>
                        <Unit
                            id={unit?.id}
                            order={unit?.order}
                            color={unit?.color}
                            description={unit?.description}
                            lessons={unit?.lessons}
                            title={unit?.title}
                            activeLesson={courseProgressData?.activeLesson}
                            activeLessonPercentage={lessonPercentageData}
                        />
                    </div>
                ))}
        </div>
            </FeedWrapper>
        </div>

    );
};

export default LearnPage;
