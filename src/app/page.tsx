'use client'
import React from 'react'
import {Button} from "@/components/ui/button";
import Header from "@/components/Header";
import Image from "next/image";

import {Loader2Icon} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import {useAuth} from "../../context/useAuth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Page = () => {

    const {user, loading} = useAuth()
    console.log(user)
    return (
        <div className='  '>
            <Header/>
            <div className='max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:fler-row items-center justify-center p-4 gap-2'>
                <div className='relative w-[240px] h-[180px] lg:w-[424px] lg:h-[324px] mb-8 lg:mb-0'>
                    <img src='https://i.pinimg.com/originals/af/76/f1/af76f142dc3edc27f83a3f894b6937d5.jpg' alt='logo'/>
                </div>
                <div className='flex flex-col items-center gap-y-8 '>
                    <h1 className='text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center'>
                        Learn, practice nad master new languages with Duolingo
                    </h1>
                    <div className='flex flex-col gap-4 items-center text-center w-full max-w-[330px]'>
                        {loading && <Loader2Icon className='h-5 w-5 text-muted-foreground animate-spin'/>}


                        {user ? <>
                            <Avatar>
                                <AvatarImage/>
                                <AvatarFallback>{user?.userName.charAt(0).toUpperCase()}</AvatarFallback>


                            </Avatar>

                            <Button asChild variant='secondary' size='lg'>
                                <Link href='/learn'>
                                    Continue learning
                                </Link>
                            </Button>

                        </> : <div>
                            <Link href='/sign-up'>
                                <Button size='lg' className='w-full' variant='secondary'>
                                    Get started
                                </Button>
                            </Link>
                            <Link href='/sign-in'>
                                <Button size='lg' className='w-full' variant='ghost'>
                                    I already have an account
                                </Button>
                            </Link>

                        </div>}


                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
}
export default Page
