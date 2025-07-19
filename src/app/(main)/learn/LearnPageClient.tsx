'use client'
import React, {useEffect} from "react";
import StickyWrapper from "@/components/StickyWrapper";
import FeedWrapper from "@/components/FeedWrapper";
import HeaderLingo from "@/components/HeaderLingo";
import UserProgress from "@/components/UserProgress";
import Unit from "@/app/(main)/learn/Unit";
import {useUser} from "@clerk/nextjs";

const LearnPageClient = ({
                             userProgressData,
                             courseProgressData,
                             lessonPercentageData,
                             unitsData,
                         }) => {
    const {user} = useUser()
    let units
    let userProgress
let courseProgress
    let lessonPercentage
    useEffect(() => {
      userProgress =  userProgressData(user?.id)
      units =  unitsData(user?.id)
        courseProgress = courseProgressData(user?.id)
      lessonPercentage =  lessonPercentageData(user?.id)
    }, [])
    return (
        <div className='flex flex-row-reverse gap-[48px] px-6'>
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress?.activeCourse}
                    hearts={userProgress?.hearts}
                    points={userProgress?.points}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <HeaderLingo title={userProgress?.activeCourse?.title || ''} />
                {units?.map((unit) => (
                    <div key={unit?.id} className={'mb-10'}>
                        <Unit
                            id={unit?.id}
                            order={unit?.order}
                            description={unit?.description}
                            lessons={unit?.lessons}
                            title={unit?.title}
                            activeLesson={courseProgress?.activeLesson}
                            activeLessonPercentage={lessonPercentage}
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    );
};

export default LearnPageClient;
