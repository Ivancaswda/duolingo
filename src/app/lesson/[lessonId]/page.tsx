import React from 'react'
import {getLesson, getUserProgress, getUserSubscription} from "../../../../db/queries";
import {redirect} from "next/navigation";
import Quiz from "@/components/Quiz";
import {currentUser} from "@clerk/nextjs/server";
import getServerUser from "@/lib/auth-server";

type props = {
    params: {
        lessonId:number
    }
}

const LessonIdPage = async ({params}: props) => {
    const user= await getServerUser()
    if (!user) {
        return
    }

    const lessonData = await getLesson(params.lessonId)
    const userProgressData = await getUserProgress()
    const userSubscriptionData = await getUserSubscription()
    if (!lessonData || !userProgressData) {
        return  redirect('/learn')
    }

    const initialPercentage = (lessonData.challenges ).filter((challenge ) =>  challenge.completed).length / lessonData.challenges.length * 100



    return (
        <Quiz initialLessonId={lessonData.id}
              initialLessonChallenges={lessonData?.challenges}
              initialHearts={userProgressData.hearts}
              initialPercentage={initialPercentage}
              userSubscription={userSubscriptionData}
        />
    )
}
export default LessonIdPage
