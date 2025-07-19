import {eq} from "drizzle-orm";
import {courses} from "../../../../../db/schema";
import {NextResponse} from "next/server";
import {getIsAdmin} from "@/lib/admin";
import db from "../../../../../db/drizzle";
import {currentUser} from "@clerk/nextjs/server";
import getServerUser from "@/lib/auth-server";

export const GET = async (req: Request, {params}: {params: {courseId: number}}) => {

    const user = await getServerUser()

    if (!user)  return  new NextResponse('Unauthorized', {status: 403})

    const isAdmin = await getIsAdmin()

    if (!isAdmin) {
        return  new NextResponse('Unauthorized', {status: 403})
    }




    const data = await db.query.courses.findFirst({
        where: eq(courses.id, params.courseId)
    })

    return NextResponse.json(data)
}

export const PUT = async (req: Request, {params}: {params: {courseId: number}}) => {

    const user = await getServerUser()

    if (!user)  return  new NextResponse('Unauthorized', {status: 403})

    const isAdmin = await getIsAdmin()

    if (!isAdmin) {
        return  new NextResponse('Unauthorized', {status: 403})
    }

    const body = await req.json()


    const data = await db.update(courses).set({
        ...body
    }).where(eq(courses.id, params.courseId)).returning()

    return NextResponse.json(data[0])
}


export const DELETE = async (req: Request, {params}: {params: {courseId: number}}) => {

    const user = await getServerUser()

    if (!user)  return  new NextResponse('Unauthorized', {status: 403})

    const isAdmin = getIsAdmin()
    if (!isAdmin) {
        return  new NextResponse('Unauthorized', {status: 403})
    }
    const data = await db.delete(courses).where(eq(courses.id, params.courseId)).returning()

    return NextResponse.json(data[0])
}