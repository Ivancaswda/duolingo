
import React from 'react'
import dynamic from 'next/dynamic'
import {getIsAdmin} from "@/lib/admin";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import getServerUser from "@/lib/auth-server";

import App from "@/app/admin/app";
const Page = async () => {

    const user = await getServerUser()
    if (!user) return

    const isAdmin = await getIsAdmin()

    if (!isAdmin) {
        redirect('/')
    }

    return (
        <App/>
    )
}
export default Page
