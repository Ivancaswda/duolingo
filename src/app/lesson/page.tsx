import React from 'react'
import {getLesson, getUserProgress, getUserSubscription} from "../../../db/queries";
import {redirect} from "next/navigation";
import Quiz from "@/components/Quiz";

import getServerUser from "@/lib/auth-server";

const LessonPage = async () => {
    const user= await getServerUser()
    if (!user) {
        return
    }
    const lessonData = await getLesson()
    const userProgressData = await getUserProgress()
    const userSubscriptionData = await getUserSubscription()
    if (!lessonData || !userProgressData) {
        return  redirect('/learn')
    }

    const initialPercentage = (lessonData.challenges  ).filter((challenge ) =>  challenge.completed).length / lessonData.challenges.length * 100



    return (
        <Quiz initialLessonId={lessonData.id}
              initialLessonChallenges={lessonData?.challenges}
              initialHearts={userProgressData.hearts}
              initialPercentage={initialPercentage}
              userSubscription={userSubscriptionData}
        />
    )
}
export default LessonPage
