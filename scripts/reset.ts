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



        console.log('resetting finished')
    } catch (error) {
        console.log(error)
        throw new Error('failed to seed the db')
    }
}

main()
