import {eq} from "drizzle-orm";
import {challenges} from "../../../../../db/schema";
import {NextResponse} from "next/server";
import {getIsAdmin} from "@/lib/admin";
import db from "../../../../../db/drizzle";

import getServerUser from "@/lib/auth-server";

export const GET = async (req: Request, {params}: {params: {challengeId: number}}) => {

    const user = await getServerUser()

    if (!user)  return  new NextResponse('Unauthorized', {status: 403})






    const data = await db.query.challenges.findFirst({
        where: eq(challenges.id, params.challengeId)
    })

    return NextResponse.json(data)
}

export const PUT = async (req: Request, {params}: {params: {challengeId: number}}) => {

    const user = await getServerUser()

    if (!user)  return  new NextResponse('Unauthorized', {status: 403})



    const body = await req.json()


    const data = await db.update(challenges).set({
        ...body
    }).where(eq(challenges.id, params.challengeId))

    return NextResponse.json(data[0])
}


export const DELETE = async (req: Request, {params}: {params: {challengeId: number}}) => {

    const user = await getServerUser()

    if (!user)  return  new NextResponse('Unauthorized', {status: 403})


    const data = await db.delete(challenges).where(eq(challenges.id, params.challengeId)).returning()

    return NextResponse.json(data[0])
}