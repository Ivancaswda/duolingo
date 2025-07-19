import {currentUser} from "@clerk/nextjs/server";
import getServerUser from "@/lib/auth-server";
// allowed userIds
const allowedEmails  = [
    "no_odfhsdfhsdfhdfskjfdkg32ydsayhfs",
    "kakashka@gmail.com"

]

export const getIsAdmin = async () => {

    const user = await getServerUser()
    const userEmail = user?.email
    if (!userEmail) return false

    return allowedEmails.indexOf(userEmail) !== -1
}