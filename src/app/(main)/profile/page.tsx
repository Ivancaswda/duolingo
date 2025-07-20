

import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {Loader2Icon, LogOut} from 'lucide-react'
import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import Promo from "@/app/(main)/learn/Promo";
import Quests from "@/components/Quests";
import FeedWrapper from "@/components/FeedWrapper";

import getServerUser from "@/lib/auth-server";
import {
    getCourseProgress,
    getLessonPercentage,
    getUnits,
    getUserProgress,
    getUserSubscription
} from "../../../../db/queries";
import {redirect} from "next/navigation";


const ProfilePage = async () => {
    const user = await getServerUser()
    const userId = user?.userId
    console.log(userId)
    console.log(user)
    if (!user) {
        return <div className='flex items-center justify-center w-full h-full
        '>
            <Loader2Icon className='animate-spin text-green-500'/>
        </div>
    }
    const userProgressData = await getUserProgress();
    console.log(userProgressData)

    if (!userProgressData) {
        redirect('/sign-in')
    }

    const courseProgressData = await getCourseProgress();
    console.log(courseProgressData)

    const unitsData = await getUnits()
    console.log(unitsData)
    if (!unitsData || !courseProgressData) {
        redirect('/courses')
    }
    const lessonPercentageData = await getLessonPercentage();
    console.log(lessonPercentageData)

    const userSubscriptionData = await getUserSubscription()


    const totalLessonsCount = unitsData.reduce((sum, unit) => {
        return sum + (unit.lessons?.length || 0);
    }, 0);

    const getLevel = (points: number) => {
        if (points < 10) return 1;
        if (points < 20) return 2;
        if (points < 30) return 3;
        if (points < 50) return 4;
        if (points < 75) return 5;
        return 6; // или продолжи дальше
    };

    const userLevel = getLevel(userProgressData.points || 0);


   const questList = [
        {
            title: 'Ученик',
            desc: "Пройди 3 урока",
            targetPoints: 3,
            image: 'https://d35aaqx5ub95lt.cloudfront.net/images/pathCharacters/dark/c45923336541ef5a8309a1758ff5ca91.svg',
            currentPoints: userProgressData?.completedLessons,
        },
        {
            title: 'Профи',
            desc: "Набери 100 XP",
            image: 'https://d35aaqx5ub95lt.cloudfront.net/images/pathCharacters/dark/350eb5e80d4ddc292088d0acc5ef3e2d.svg',
            targetPoints: 100,
            currentPoints: userProgressData?.points,
        },
        {
            title: 'Отличник',
            desc: "Заверши 2 юнита",
            image:'https://d35aaqx5ub95lt.cloudfront.net/images/pathCharacters/dark/c4419cac8477c25a1761abbf438cf531.svg',
            targetPoints: 2,
            currentPoints: userProgressData?.completedUnits,
        },
    ];
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

            <div className="max-w-full flex items-center flex-col mx-auto py-12 px-4">
                <div className="flex flex-col items-center gap-4 w-full">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={user?.image}/>
                        <AvatarFallback>{user.userName?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className='flex items-end justify-between'>
                        <div className="text-center">

                            <h1 className="text-2xl font-bold text-primary">
                                {user.userName || 'Без имени'}
                            </h1>

                            <p className="text-gray-500">{user.email || 'Нет почты'}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <img src={userProgressData?.activeCourse?.imageSrc} alt="country"/>
                            <h1>{userProgressData?.activeCourse?.title}</h1>
                        </div>
                    </div>


                    <div className=" rounded-xl  py-4 mt-4 w-full ">
                        <h3 className="font-semibold text-lg mb-2 text-green-600">✅ Прогресс</h3>
                        <div className="text-sm text-gray-700 flex items-center  gap-3">
                            <div className='flex items-center gap-3 max-w-md shadow rounded-lg p-3 bg-gray-100'>
                                <div>
                                    <img className='w-[20px] h-[20px]'
                                         src="https://d35aaqx5ub95lt.cloudfront.net/images/icons/65b8a029d7a148218f1ac98a198f8b42.svg"
                                         alt="icon-fire"/>

                                </div>
                                <div className='flex flex-col gap-2'>
                                    <span className="font-bold text-primary">{unitsData?.length}</span>
                                    <p>Всего юнитов:</p>
                                </div>

                            </div>

                            <br/>
                            <div className='flex items-center gap-3 max-w-md shadow rounded-lg p-3 bg-gray-100'>
                                <img className='w-[20px] h-[20px]'
                                     src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/0f2ec3b0ead032476829f47c4157a4fd.svg"
                                     alt="icon-shield"/>


                                <div className='flex flex-col gap-2'>
                                    <span className="font-bold text-primary">{totalLessonsCount}</span>
                                    <p> Всего уроков: </p>
                                </div>
                            </div>

                            <br/>
                            <div className='flex items-center gap-3 max-w-md shadow rounded-lg p-3 bg-gray-100'>
                                <img className='w-[20px] h-[20px]'
                                     src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/19ec3540a6f61850c006fe779299abfe.svg"
                                     alt="icon-energy"/>
                                <div className='flex flex-col gap-2'>
                                    <span className="font-bold text-primary">{userLevel}</span>
                                    <p>Уровень: </p>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

                <div className="mt-6 w-full">
                    <h3 className="font-semibold text-lg mb-4 text-green-600">🎯 Квесты</h3>
                    <div className="grid gap-4">
                        {questList.map((quest, index) => {
                            const progress = Math.min(
                                (userProgressData.points / quest.targetPoints) * 100,
                                100
                            );

                            return (

                                <div
                                    key={index}
                                    className="bg-gray-100 p-4 flex items-center gap-2  rounded-xl shadow-md "
                                >
                                    <img className='w-[120px] h-[120px]'
                                        src={quest?.image || 'https://d35aaqx5ub95lt.cloudfront.net/vendor/7ef36bae3f9d68fc763d3451b5167836.svg'}
                                        alt="gg"/>
                                    <div className='flex flex-col gap-2 w-full'>


                                        <div className="flex justify-between items-center">
                                            <span className="font-extrabold text-sm">{quest.title}</span>
                                            <span className="text-xs text-gray-600">
                  {quest.currentPoints}/{quest.targetPoints}
                </span>

                                        </div>

                                        <div className="w-full bg-gray-300 rounded-full h-2.5 overflow-hidden">
                                            <div
                                                className="bg-green-500 h-full transition-all duration-300"
                                                style={{width: `${progress}%`}}
                                            />
                                        </div>
                                        <span className="font-semibold text-sm">{quest.desc}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </div>

    )
}

export default ProfilePage
