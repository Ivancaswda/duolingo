'use client'
import React from 'react'
import Image from "next/image";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Loader2Icon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useExitModal} from "../../store/use-exit-modal";
import {useAuth} from "../../context/useAuth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";

const Header = () => {

    const {user, loading,logout} = useAuth()

    return (
        <header className=' w-full border-b-2 border-slate-200 py-2 px-4'>
            <div className='lg:max-w-screen-lg pt-7  mx-auto  lg:mt-[-28px] flex items-center justify-between h-full'>
                <div className='pl-4  flex items-center gap-x-3'>
                    <Image width={110} height={70} alt='mascot-icon' src='https://d35aaqx5ub95lt.cloudfront.net/images/splash/f92d5f2f7d56636846861c458c0d0b6c.svg'/>

                </div>
                {loading && <Loader2Icon className='animate-spin w-5 h-5 text-muted-foreground'/>}


                {!loading && (
                    <div>
                        {user ? (
                            <div className='flex items-center gap-4'>

                                <Popover>
                                    <PopoverTrigger> <Avatar>
                                        <AvatarImage />
                                        <AvatarFallback >{user?.userName.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar></PopoverTrigger>
                                    <PopoverContent className='w-[96%]'>
                                        <div className='flex items-start gap-2'>
                                            <div className='flex flex-col gap-3 cursor-pointer'>
                                                <div >
                                                    <Link href='/shop'>
                                                        Duolingo prem
                                                    </Link>

                                                </div>
                                                <div >
                                                    <Link href='/admin-auth'>
                                                        Для администрации
                                                    </Link>

                                                </div>
                                                <div onClick={logout}>
                                                    Выйти
                                                </div>
                                            </div>
                                            <img className='w-[35px] h-[35px] rounded-lg' src="https://avatars.mds.yandex.net/i?id=e114543003255b2e2fab6e1a2844ed01_l-7015254-images-thumbs&n=13" alt="duolingo icon"/>
                                        </div>

                                    </PopoverContent>
                                </Popover>


                                <Button asChild variant='secondary' size='lg'>
                                    <Link href='/learn'>
                                        Продолжить учиться
                                    </Link>
                                </Button>
                            </div>

                        ) : <div>
                            <Button variant='ghost'>
                            <Link href='/sign-in'>
                                    Войти
                                </Link>
                            </Button>
                        </div>}
                    </div>
                )}
            </div>
        </header>
    )
}
export default Header
