import {cache} from "react";
import db from "./drizzle";

import {eq} from "drizzle-orm";
import {userProgress, courses, units, lessons, challengeProgress, userSubscription} from "./schema";
import getServerUser from "@/lib/auth-server";

export const getUserProgress = cache(async  () => {
    const user = await getServerUser()


    if (!user?.userId) {
        return
    }
    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, user?.userId),
        with: {
            activeCourse: true
        }
    })
    return data
})

export const getUnits = cache(async () => {
    const user = await getServerUser()
    const userId = user?.userId
    if (!userId) {
        return
    }

    const userProgress = await getUserProgress()


    if (!userProgress?.activeCourseId) {
        return []
    }

    const data = await db.query.units.findMany({
        orderBy: (units, {asc}) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, {asc}) => [asc(lessons.order)],
                with: {
                    challenges: {
                        orderBy: (challenges, {asc}) => [asc(challenges.order)],
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId)
                            }
                        }
                    }
                }
            }
        }

    })

    const normalizedData = data.map((unit) => {
        const lessonWithCompletedStatus = unit.lessons.map((lesson) => {

            if (lesson.challenges.length === 0) {
                return  {...lesson, completed: true}
            }

            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress) => progress.completed);
            });
            return {...lesson, completed: allCompletedChallenges};
        })
        return {...unit, lessons: lessonWithCompletedStatus}
    })
    return normalizedData!
})

export const getCourses = cache(async  () => {
    const data = await db.query.courses.findMany()

    return data!
})


export const getCourseById = cache(async (courseId: number ) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        with: {
            units: {
                orderBy: (units, {asc}) => [asc(units.order)],
                with: {
                    lessons: {
                        orderBy: (lessons, {asc}) => [asc(lessons.order)]
                    }
                }
            }
        }
    })

    return data!
})

export const getCourseProgress = cache(async () => {

    const user = await getServerUser()
    const userId = user?.userId

    const userProgress = await getUserProgress();

    if ( !userProgress?.activeCourseId) {
        return null;
    }

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId)
                            }
                        }
                    }
                }
            }
        }
    });

    const firstUncompletedLesson = unitsInActiveCourse
        .flatMap(unit => unit.lessons)
        .find(lesson =>
            lesson.challenges.some(challenge =>
                !challenge.challengeProgress ||
                challenge.challengeProgress.length === 0 ||
                challenge.challengeProgress.some(progress => progress.completed === false)
            )
        );

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id
    };
});

export const getLesson = cache(async  (id?:number) => {
    const user = await getServerUser()
    const userId = user?.userId

    const courseProgress = await getCourseProgress()

    const lessonId = id || courseProgress?.activeLessonId;

    if (!lessonId ) return null

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, {asc}) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId)
                    }
                }
            }
        }
    })


    if (!data || !data.challenges) {
        return null
    }


    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed = challenge.challengeProgress && challenge.challengeProgress.length > 0
        && challenge.challengeProgress.every((progress) => progress.completed)

        return {...challenge, completed}
    })


    return {...data, challenges: normalizedChallenges}
})

export const getLessonPercentage = cache(async () => {
   const user = await getServerUser()


    const courseProgress = await getCourseProgress();
    if (!courseProgress?.activeLessonId) {
        return 0
    }

    const lesson = await getLesson(courseProgress.activeLessonId)

    if (!lesson) {
        return 0
    }

    const completedChallenges = lesson.challenges.filter((challenge) =>challenge.completed)

    const percentage = Math.round((completedChallenges.length / lesson.challenges.length) * 100)

    return percentage!
})

const day_in_ms = 86_400_400
export const getUserSubscription = cache(async () => {

    const user = await getServerUser()
    const userId = user?.userId
    if (!userId) return null

    const data = await db.query.userSubscription.findFirst({
        where: eq(userSubscription.userId, userId)
    })
    if (!data) return  null

    const isActive = data.stripePriceId && data?.stripeCurrentPeriodEnd?.getTime()! + day_in_ms > Date.now()


    return  {
        ...data,
        isActive: !!isActive
    }
})

export const getTopTenUsers = cache(async () => {
    const user = await getServerUser()
    const userId = user?.userId
    if (!userId) {
        return []
    }

    const data = await db.query.userProgress.findMany({
        orderBy: (userProgress, {desc}) => [desc(userProgress.points)],
        limit: 10,
        columns: {
            userId: true,
            userName: true,
            userImageSrc: true,
            points: true
        }
    })

    return data
})