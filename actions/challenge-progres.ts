'use server'
import {getUserProgress, getUserSubscription} from "../db/queries";
import db from "../db/drizzle";
import {eq, and} from "drizzle-orm";
import {challengeProgress, challenges, userProgress} from "../db/schema";
import {revalidatePath} from "next/cache";
import getServerUser from "@/lib/auth-server";
import {updateUserStats} from "./update-user-stats";

export const upsertChallengeProgress = async (challengeId: number) => {
    const user = await getServerUser()
    const userId = user?.userId

    if (!userId) {
        throw  new Error('Unauth')
    }

    const currentUserProgress = await getUserProgress()

    const userSubscriptionData = await getUserSubscription()

    if (!currentUserProgress) {
        throw  new Error('User progress not found')
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    })

    if (!challenge) {
        throw  new Error('Challenge not found!')
    }
    const lessonId = challenge.lessonId

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        )
    })

    const isPractice = !!existingChallengeProgress;


    if (currentUserProgress.hearts === 0 && !isPractice && !userSubscriptionData?.isActive) {
        return {error: 'hearts'}
    }

    if (isPractice) {
        await db.update(challengeProgress).set({
            completed:true
        }).where(eq(challengeProgress.id, existingChallengeProgress.id))

        await db.update(userProgress).set({
            hearts: Math.min(currentUserProgress.hearts + 1, 5),
            points: currentUserProgress.points
        }).where(eq(userProgress.userId, userId))
        await updateUserStats()


        revalidatePath('/learn')
        revalidatePath('/lesson')
        revalidatePath('/quests')
        revalidatePath('/leaderboard')
        revalidatePath(`/lesson/${lessonId}`)
        return
    }

    await db.insert(challengeProgress).values({
        challengeId,
        userId,
        completed:true
    })

    await db.update(userProgress).set({
        points: currentUserProgress.points + 10
    }).where(eq(userProgress.userId, userId))
    await updateUserStats()


    revalidatePath('/learn')
    revalidatePath('/lesson')
    revalidatePath('/quests')
    revalidatePath('/leaderboard')
    revalidatePath(`/lesson/${lessonId}`)

}