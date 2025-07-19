import 'dotenv/config'
import {drizzle} from "drizzle-orm/node-postgres";
import {neon} from '@neondatabase/serverless'
import { sql } from 'drizzle-orm';

import * as schema from '../db/schema.ts'
import db from "../db/drizzle";

const main = async () => {
    try {
        await db.delete(schema.courses).where(sql`true`);
        await db.delete(schema.userProgress).where(sql`true`);
        await db.delete(schema.units).where(sql`true`);
        await db.delete(schema.challenges).where(sql`true`);
        await db.delete(schema.challengeProgress).where(sql`true`);
        await db.delete(schema.challengeOptions).where(sql`true`);
        await db.delete(schema.userSubscription).where(sql`true`)




        const [insertedLesson] = await db.insert(schema.lessons).values([
            {
                unitId: insertedUnit.id,
                order: 1,
                title: 'Nouns'
            },
            // other lessons
        ]).returning({ id: schema.lessons.id });

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId:insertedLesson.id,
                type: 'SELECT',
                order: 1,
                question: 'Which one of these is  the apple'
            },
            {
                id: 2,
                lessonId:insertedLesson.id,
                type: 'ASSIST',
                order: 2,
                question: 'the man'
            },
            {
                id: 3,
                lessonId:insertedLesson.id,
                type: 'SELECT',
                order: 3,
                question: 'which one of these is the robotthe man'
            }
        ]).returning({ id: schema.challenges.id });
        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId:insertedLesson.id,
                type: 'SELECT',
                order: 1,
                question: 'Which one of these is  the apple'
            },
            {
                id: 5,
                lessonId:insertedLesson.id,
                type: 'ASSIST',
                order: 2,
                question: 'the man'
            },
            {
                id: 6,
                lessonId:insertedLesson.id,
                type: 'SELECT',
                order: 3,
                question: 'which one of these is the robotthe man'
            }
        ]).returning({ id: schema.challenges.id });

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 2,
                imageSrc: '/apple.png',
                correct: true,
                text: 'Apfel',
                audioSrc: '/de_apple.mp3'
            },
            {

                challengeId: 2,
                imageSrc: '/orange.png',
                correct: false,
                text: 'Karrote',
                audioSrc: '/de_carrot.mp3'
            },
            {

                challengeId: 2,
                imageSrc: '/robot.png',
                correct: false,
                text: 'Robot',
                audioSrc: '/de_robot.mp3'
            },

        ]).returning({ id: schema.challengeOptions.id });

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,

                correct: true,
                text: 'Apfel',
                audioSrc: '/de_apple.mp3'
            },
            {

                challengeId: 1,

                correct: false,
                text: 'Karrote',
                audioSrc: '/de_carrot.mp3'
            },
            {

                challengeId: 1,

                correct: false,
                text: 'Robot',
                audioSrc: '/de_robot.mp3'
            },

        ]).returning({ id: schema.challengeOptions.id });
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3,

                correct: true,
                text: 'Apfel',
                audioSrc: '/de_apple.mp3'
            },
            {

                challengeId: 3,

                correct: false,
                text: 'Karrote',
                audioSrc: '/de_carrot.mp3'
            },
            {

                challengeId: 3,

                correct: false,
                text: 'Robot',
                audioSrc: '/de_robot.mp3'
            },

        ]).returning({ id: schema.challengeOptions.id });

        console.log('seeding finished')
    } catch (error) {
        console.log(error)
        throw new Error('failed to seed the db')
    }
}

main()
