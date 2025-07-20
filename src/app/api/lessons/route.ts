import {NextResponse} from "next/server";

import db from "../../../../db/drizzle";
import {lessons} from "../../../../db/schema";
import {getIsAdmin} from "@/lib/admin";
import {currentUser} from "@clerk/nextjs/server";
import getServerUser from "@/lib/auth-server";

export const GET = async  () => {
    const user = await getServerUser()

    if (!user) return

    const data = await db.query.lessons.findMany()


    return NextResponse.json(data)
}


export const POST = async (req: Request) => {
    const user=  await getServerUser()

    if (!user) return



    const body = await req.json()

    const data = await db.insert(lessons).values({
        ...body
    }).returning()

    return  NextResponse.json(data[0])


}



