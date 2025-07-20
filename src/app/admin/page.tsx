'use client'
import React from 'react'

import {getIsAdmin} from "@/lib/admin";

import {redirect} from "next/navigation";


import App from "@/app/admin/app";

const Page = () => {


    const isAdmin =  getIsAdmin()

    if (!isAdmin) {
        redirect('/admin-auth')
        return
    }

    return (
        <App/>
    )
}
export default Page
