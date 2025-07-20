'use server'

import db from "../db/drizzle";
import {getUnits} from "../db/queries";
import {userProgress} from "../db/schema";
import getServerUser from '@/lib/auth-server'
import { eq } from 'drizzle-orm'

export const updateUserStats = async () => {
    const user = await getServerUser()
    if (!user?.userId) throw new Error('User not found')

    const units = await getUnits()
    let completedLessons = 0
    let completedUnits = 0

    for (const unit of units) {
        let unitComplete = true
        for (const lesson of unit.lessons) {
            if (!lesson.completed) unitComplete = false
            if (lesson.completed) completedLessons++
        }
        if (unitComplete) completedUnits++
    }

    await db.update(userProgress).set({
        completedLessons,
        completedUnits,
    }).where(eq(userProgress.userId, user.userId))
}
