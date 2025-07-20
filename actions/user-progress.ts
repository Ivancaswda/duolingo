'use server'

import {getCourseById, getUserProgress, getUserSubscription} from "../db/queries";
import {userProgress, challengeProgress, challenges} from "../db/schema";
import {revalidatePath} from "next/cache";
import db from "../db/drizzle";
import {redirect} from "next/navigation";
import {and, eq} from "drizzle-orm";
import {points_to_refill} from "../constant";
import getServerUser from "@/lib/auth-server";






export const upsertUserProgress = async ({
                                             courseId,
                                         }: {
    courseId: number
}) => {

    const user = await getServerUser()
    const userId = user?.userId

    if (!userId) throw  new Error('user not found')
    const course =  await getCourseById(courseId)

    if (!course) {
        throw  new Error('Course not found')
    }
    if (!course.units.length || !course.units[0].lessons.length) {
        throw new Error('course is empty')
    }


    const existingUserProgress = await getUserProgress()
    if (existingUserProgress) {
        await db.update(userProgress)
            .set({
                activeCourseId: courseId,
                userName: user?.userName || 'User',
                userImageSrc: user?.image || '/mascot.png'
            })
        revalidatePath('/courses')
        revalidatePath('/learn')
        redirect('/learn')
        return
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user?.userName || 'User',
        userImageSrc: user?.image || '/mascot.png'
    })

    revalidatePath('/courses')
    revalidatePath('/learn')
    redirect('/learn')
 }

export const reduceHearts = async (challengeId:number) => {
    const user = await getServerUser()
    const userId = user?.userId

    if (!userId) throw  new Error('user not found')

    const currentUserProgress = await getUserProgress()
    const userSubscription = await getUserSubscription()
    const challenge= await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    })

    if (!challenge) {
        throw new Error('Challenge not found')
    }

    const lessonId = challenge.lessonId

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        )
    })

    const isPractice = !!existingChallengeProgress

    if (isPractice) {
        return {error: 'practice'}
    }

    if (!currentUserProgress) {
        throw  new Error('User progress not found')
    }

    if (userSubscription?.isActive) {
        return  {error: 'subscription'}
    }

    if (currentUserProgress.hearts === 0) {
        return  {error: 'hearts'}
    }


    await db.update(userProgress).set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0)
    }).where(eq(userProgress.userId, userId))

    revalidatePath('/shop')
    revalidatePath('/learn')
    revalidatePath(`/lesson/${lessonId}`)
    revalidatePath('/quests')
    revalidatePath('/leaderboard')

}


export const refillHearts = async () => {
    const user = await getServerUser()
    const userId = user?.userId

    if (!userId) throw  new Error('user not found')

    const currentUserProgress = await getUserProgress()

    if (!currentUserProgress) {
        throw  new Error('user progress not found')
    }

    if (currentUserProgress.hearts === 5) {
        throw  new Error('hearts are already full')
    }

    if (currentUserProgress.points < points_to_refill) {
        throw  new Error('not enought points')
    }

    db.update(userProgress).set({
        hearts: 5,
        points: currentUserProgress.points - points_to_refill,
    }).where(eq(userProgress.userId, currentUserProgress.userId))

    revalidatePath('/shop')
    revalidatePath('/learn')
    revalidatePath('/quests')
    revalidatePath('/leaderboard')


}
