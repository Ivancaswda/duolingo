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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
const Sidebar = ({className}: SidebarProps) => {

    const {loading, user, logout} = useAuth()

    return (
        <div className={cn('flex   h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col', className)}>
            <Link href='/learn'>
                <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
                    <img src='https://d35aaqx5ub95lt.cloudfront.net/images/splash/f92d5f2f7d56636846861c458c0d0b6c.svg' height={120} width={120} alt='logo'/>

                </div>
            </Link>
            <div className='flex flex-col gap-y-2 flex-1'>
                <SidebarItem label='Обучение' iconSrc='https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg' href='/learn'/>
                <SidebarItem label='Доска почета' iconSrc='https://d35aaqx5ub95lt.cloudfront.net/vendor/ca9178510134b4b0893dbac30b6670aa.svg' href='/leaderboard'/>
                <SidebarItem label='Квэсты' iconSrc='https://cdn-icons-png.flaticon.com/512/1409/1409014.png' href='/quests'/>
                <SidebarItem label='Магазин' iconSrc='https://d35aaqx5ub95lt.cloudfront.net/vendor/0e58a94dda219766d98c7796b910beee.svg' href='/shop'/>
                <SidebarItem label='Курсы' iconSrc='data:image/png;base64,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' href='/courses'/>

                <SidebarItem label='Профиль' iconSrc='https://d35aaqx5ub95lt.cloudfront.net/vendor/24e0dcdc06870ead47b3600f0d41eb5b.svg' href='/profile'/>


                <Popover>
                    <PopoverTrigger>
                        <div className='flex items-center px-4 gap-3 hover:bg-neutral-200/50 py-2 rounded-lg'>

                            <img src='https://d35aaqx5ub95lt.cloudfront.net/vendor/7159c0b5d4250a5aea4f396d53f17f0c.svg'
                                 width={30} height={30} alt=""/>
                            <h1 className='text-neutral-500 text-sm'>Более</h1>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className='flex items-start flex-col font-semibold'>
                            <h1 className='cursor-pointer hover:bg-neutral-200/50 w-full px-2 py-4'>Настройки</h1>
                            <h1  className='cursor-pointer hover:bg-neutral-200/50 w-full px-2  py-4'>Справка</h1>
                            <h1 onClick={logout} className='cursor-pointer hover:bg-neutral-200/50 w-full px-2  py-4'>Выйти</h1>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div>
                {loading &&  <Loader2Icon className='h-5 w-5 text-muted-foreground animate-spin'/>}


                {!loading && !user &&    <Link href='/sign-in'>
                    <Button  >
                        Sign in
                    </Button>
                </Link>}
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center justify-center gap-4'>
                        <div className='flex flex-col items-start gap-3 text-xs '><p className='cursor-pointer hover:text-green-500 transition hover:scale-105'>Info</p><p className='cursor-pointer hover:text-green-500 transition hover:scale-105'>Защита</p><p className='cursor-pointer hover:text-green-500 transition hover:scale-105'> История</p></div>
                        <div className='flex flex-col items-start gap-3 text-xs'><p className='cursor-pointer hover:text-green-500 transition hover:scale-105'>Проверка</p><p className='cursor-pointer hover:text-green-500 transition hover:scale-105'>Отзывы</p><p className='cursor-pointer hover:text-green-500 transition hover:scale-105'>Поддержка</p></div>
                        <div className='flex flex-col items-start gap-3 text-xs'><p className='cursor-pointer hover:text-green-500 transition hover:scale-105'>Создатель</p><p className='cursor-pointer hover:text-green-500 transition hover:scale-105'>Компания</p><p className='cursor-pointer hover:text-green-500 transition hover:scale-105'>Соцсети</p></div>
                    </div>
                    <div className='flex items-center justify-center gap-4'>
                        <img className='w-[30px] h-[30px] rounded-lg'
                             src="https://avatars.mds.yandex.net/i?id=ee9021e1c866277fa63ffec83e543330_l-9202550-images-thumbs&n=13"
                             alt="dualingo"/>
                        <Link href='/admin-auth'>
                            <Button className='cursor-pointer'>Для администрации</Button>
                        </Link>
                    </div>

                </div>


            </div>
        </div>
    )
}
export default Sidebar
