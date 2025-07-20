'use client'
import React from 'react'
import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "@/components/SidebarItem";
import {ClerkLoaded, ClerkLoading, UserButton} from "@clerk/nextjs";
import {Loader2Icon} from "lucide-react";
import {useAuth} from "../../context/useAuth";
import {Button} from "@/components/ui/button";

type SidebarProps = {
    className: string
}

const Sidebar = ({className}: SidebarProps) => {

    const {loading, user} = useAuth()

    return (
        <div className={cn('flex   h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col', className)}>
            <Link href='/learn'>
                <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
                    <img src='https://d35aaqx5ub95lt.cloudfront.net/images/splash/f92d5f2f7d56636846861c458c0d0b6c.svg' height={120} width={120} alt='logo'/>

                </div>
            </Link>
            <div className='flex flex-col gap-y-2 flex-1'>
                <SidebarItem label='learn' iconSrc='/learn.png' href='/learn'/>
                <SidebarItem label='Leaderboard' iconSrc='/leaderboard.png' href='/leaderboard'/>
                <SidebarItem label='quests' iconSrc='/quests.png' href='/quests'/>
                <SidebarItem label='shop' iconSrc='/shop.png' href='/shop'/>
            </div>
            <div>
                {loading &&  <Loader2Icon className='h-5 w-5 text-muted-foreground animate-spin'/>}


                {!loading && !user &&    <Link href='/sign-in'>
                    <Button variant='super' >
                        Sign in
                    </Button>
                </Link>}




            </div>
        </div>
    )
}
export default Sidebar
