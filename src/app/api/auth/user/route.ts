import {verifyToken} from "@/lib/jwt";
import db from "../../../../../db/drizzle";
import { userProgress } from "../../../../../db/schema";
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"

export async function GET(req: Request) {
    const cookieStore = cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
        return new Response("Unauthorized", { status: 401 })
    }

    try {
        const decoded = verifyToken(token) as { email: string }
        console.log(decoded)
        const users = await db.select().from(userProgress).where(eq(userProgress.email, decoded.email)).limit(1)
        console.log(users)
        const user = users[0]

        if (!user) {
            return new Response("User not found", { status: 404 })
        }

        return Response.json({
            user: {
                email: user.email,
                userName: user.userName,
                points: user.points ?? 0,
                hearts: user.hearts ?? 0
            },
        })
    } catch (err: any) {
        return new Response("Invalid token", { status: 401 })
    }
}  