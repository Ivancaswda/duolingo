import db from "../../../../../db/drizzle"
import { userProgress } from "../../../../../db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { generateToken } from "@/lib/jwt"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { email, password, userName } = await req.json()

        if (!email || !password || !userName) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const existingUsers = await db
            .select()
            .from(userProgress)
            .where(eq(userProgress.email, email))
            .limit(1)

        if (existingUsers.length > 0) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 })
        }

        const hashed = await bcrypt.hash(password, 10)
        const userId = randomUUID()

        await db.insert(userProgress).values({
            userId,
            userName,
            email,
            password: hashed,
            hearts: 5,
            points: 0,
        })

        const token = generateToken({ email, userName, userId })

        const res = NextResponse.json({
            message: "Registered",
            user: {
                email,
                userName,
            },
        })

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 неделя
        })

        return res
    } catch (err: any) {
        console.error("🚨 Registration error:", err)
        return NextResponse.json(
            { error: "Internal Server Error", details: err.message },
            { status: 500 }
        )
    }
}