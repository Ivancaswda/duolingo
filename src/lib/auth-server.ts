// lib/auth-server.ts

import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secr7JUINet"

async function getServerUser() {
    const token = (await cookies()).get("token")?.value

    if (!token) return null

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            email: string,
            userName: string,
            userId: string
        }
        return decoded
    } catch (err) {
        return null
    }
}
export default getServerUser