import 'dotenv/config'
import {drizzle} from "drizzle-orm/node-postgres";
import {neon} from '@neondatabase/serverless'
import { sql } from 'drizzle-orm';

import * as schema from '../db/schema.ts'
import db from "../db/drizzle.ts";

const main = async () => {
    try {
        await db.delete(schema.courses).where(sql`true`);
        await db.delete(schema.userProgress).where(sql`true`);
        await db.delete(schema.units).where(sql`true`);
        await db.delete(schema.challenges).where(sql`true`);
        await db.delete(schema.challengeProgress).where(sql`true`);
        await db.delete(schema.challengeOptions).where(sql`true`);
        await db.delete(schema.userSubscription).where(sql`true`)

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: 'Spanish',
                imageSrc: '/es.png'
            },
            {
                id: 2,
                title: 'Croatian',
                imageSrc: '/es.png'
            },
            {
                id: 3,
                title: 'French',
                imageSrc: '/es.png'
            },
            {
                id: 4,
                title: 'English',
                imageSrc: '/es.png'
            },
            {
                id: 5,
                title: 'Portugese',
                imageSrc: '/es.png'
            },
            {
                id: 6,
                title: 'Dutch',
                imageSrc: '/es.png'
            },
            {
                id: 7,
                title: 'Scottish',
                imageSrc: '/es.png'
            },
            {
                id: 8,
                title: 'Irish',
                imageSrc: '/es.png'
            },
            {
                id: 9,
                title: 'German',
                imageSrc: '/es.png'
            }
        ])
        const [insertedUnit] = await db.insert(schema.units)
            .values({
                courseId: 1,
                title: 'Unit 1',
                description: 'Learn the basics of Spanish',
                order: 1,
            })
            .returning({ id: schema.units.id });



        const [lesson1] = await db.insert(schema.lessons).values({
            unitId: insertedUnit.id,
            order: 1,
            title: 'Nouns'
        }).returning({ id: schema.lessons.id });

        const [lesson2] = await db.insert(schema.lessons).values({
            unitId: insertedUnit.id,
            order: 2,
            title: 'Verbs'
        }).returning({ id: schema.lessons.id });
        const [lesson3] = await db.insert(schema.lessons).values({
            unitId: insertedUnit.id,
            order: 2,
            title: 'Verbs'
        }).returning({ id: schema.lessons.id });
        const [lesson4] = await db.insert(schema.lessons).values({
            unitId: insertedUnit.id,
            order: 2,
            title: 'Verbs'
        }).returning({ id: schema.lessons.id });

         await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: lesson1?.id,
                type: 'SELECT',
                order: 1,
                question: 'Which one of these is  the apple'
            },
            {
                id: 2,
                lessonId:lesson1?.id,
                type: 'ASSIST',
                order: 2,
                question: 'the man'
            },
            {
                id: 3,
                lessonId:lesson1?.id,
                type: 'SELECT',
                order: 3,
                question: 'which one of these is the robotthe man'
            }
        ]).returning({ id: schema.challenges.id });

        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: lesson2?.id,
                type: 'SELECT',
                order: 1,
                question: 'Which one of these is  the apple'
            },
            {
                id: 5,
                lessonId:lesson2?.id,
                type: 'ASSIST',
                order: 2,
                question: 'the man'
            },
            {
                id: 6,
                lessonId:lesson2?.id,
                type: 'SELECT',
                order: 3,
                question: 'which one of these is the robotthe man'
            }
        ]).returning({ id: schema.challenges.id });

        await db.insert(schema.challenges).values([
            {
                id: 7,
                lessonId: lesson3?.id,
                type: 'SELECT',
                order: 1,
                question: 'Which one of these is  the apple'
            },
            {
                id: 8,
                lessonId:lesson3?.id,
                type: 'ASSIST',
                order: 2,
                question: 'the man'
            },
            {
                id: 9,
                lessonId:lesson3?.id,
                type: 'SELECT',
                order: 3,
                question: 'which one of these is the robotthe man'
            }
        ]).returning({ id: schema.challenges.id });

        await db.insert(schema.challenges).values([
            {
                id: 10,
                lessonId: lesson4?.id,
                type: 'SELECT',
                order: 1,
                question: 'Which one of these is  the apple'
            },
            {
                id: 11,
                lessonId:lesson4?.id,
                type: 'ASSIST',
                order: 2,
                question: 'the man'
            },
            {
                id: 12,
                lessonId:lesson4?.id,
                type: 'SELECT',
                order: 3,
                question: 'which one of these is the robotthe man'
            }
        ]).returning({ id: schema.challenges.id });


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
                challengeId: 2,
                imageSrc: '/apple.png',
                correct: true,
                text: 'El hompbe',
                audioSrc: '/de_apple.mp3'
            },
            {

                challengeId: 2,
                imageSrc: '/orange.png',
                correct: false,
                text: 'Danke',
                audioSrc: '/de_carrot.mp3'
            },
            {

                challengeId: 2,
                imageSrc: '/robot.png',
                correct: false,
                text: 'Gerate',
                audioSrc: '/de_robot.mp3'
            },

        ]).returning({ id: schema.challengeOptions.id });

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3,
                imageSrc: '/apple.png',
                correct: true,
                text: 'El hompbe',
                audioSrc: '/de_apple.mp3'
            },
            {

                challengeId: 3,
                imageSrc: '/orange.png',
                correct: false,
                text: 'Danke',
                audioSrc: '/de_carrot.mp3'
            },
            {

                challengeId: 3,
                imageSrc: '/robot.png',
                correct: false,
                text: 'Gerate',
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
