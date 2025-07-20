import {NextResponse} from "next/server";

import db from "../../../../db/drizzle";
import {challengeOptions} from "../../../../db/schema";

import getServerUser from "@/lib/auth-server";

export const GET = async  () => {
    const user = await getServerUser()

    if (!user) return

    const data = await db.query.challengeOptions.findMany()


    return NextResponse.json(data)
}


export const POST = async (req: Request) => {
    const user=  await getServerUser()

    if (!user) return



    const body = await req.json()

    const data = await db.insert(challengeOptions).values({
        ...body
    }).returning()

    return  NextResponse.json(data[0])


}



