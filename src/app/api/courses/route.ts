import {NextResponse} from "next/server";

import db from "../../../../db/drizzle";
import {courses} from "../../../../db/schema";
import {getIsAdmin} from "@/lib/admin";
import {currentUser} from "@clerk/nextjs/server";
import getServerUser from "@/lib/auth-server";

export const GET = async  () => {
    const user = await getServerUser()

    if (!user) return

    const data = await db.query.courses.findMany()
    const isAdmin = await getIsAdmin()
    if (!isAdmin) {
        return  new NextResponse('Unauthorized', {status: 401})
    }

    return NextResponse.json(data)
}


export const POST = async (req: Request) => {
    const user=  await getServerUser()

    if (!user) return

    const isAdmin = await getIsAdmin()

    if (!isAdmin) {
        return new NextResponse('Unauthorized', {status: 401})
    }

    const body = await req.json()

    const data = await db.insert(courses).values({
        ...body
    }).returning()

    return  NextResponse.json(data[0])


}



