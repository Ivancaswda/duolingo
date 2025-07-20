import {eq} from "drizzle-orm";
import {lessons} from "../../../../../db/schema";
import {NextResponse} from "next/server";
import {getIsAdmin} from "@/lib/admin";
import db from "../../../../../db/drizzle";
import {currentUser} from "@clerk/nextjs/server";
import getServerUser from "@/lib/auth-server";

export const GET = async (req: Request, {params}: {params: {lessonId: number}}) => {

    const user = await getServerUser()

    if (!user)  return  new NextResponse('Unauthorized', {status: 403})






    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, params.lessonId)
    })

    return NextResponse.json(data)
}

export const PUT = async (req: Request, {params}: {params: {lessonId: number}}) => {

    const user = await getServerUser()

    if (!user)  return  new NextResponse('Unauthorized', {status: 403})



    const body = await req.json()


    const data = await db.update(lessons).set({
        ...body
    }).where(eq(lessons.id, params.lessonId))

    return NextResponse.json(data[0])
}


export const DELETE = async (req: Request, {params}: {params: {lessonId: number}}) => {

    const user = await getServerUser()

    if (!user)  return  new NextResponse('Unauthorized', {status: 403})


    const data = await db.delete(lessons).where(eq(lessons.id, params.lessonId)).returning()

    return NextResponse.json(data[0])
}