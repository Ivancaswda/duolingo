'use client'
import React, {useEffect} from 'react'
import {Button} from "@/components/ui/button";
import Header from "@/components/Header";
import Image from "next/image";
import {Timeline} from "@/components/ui/timeline"
import {Loader2Icon} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import {useAuth} from "../../context/useAuth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {scrollData} from "../../constant";
import {useRouter} from "next/navigation";

const Page = () => {
    const router = useRouter()
    const {user, loading, setUser} = useAuth()
    console.log(user)


    useEffect(() => {
        // если пользователь не установлен, пробуем получить его заново
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/user")
                if (res.ok) {
                    const data = await res.json()
                    setUser(data.user)
                }
            } catch (e) {
                console.error("Ошибка при получении пользователя:", e)
            }
        }

        if (!user) {
            fetchUser()
        }
    }, [user, setUser])
    useEffect(() => {
        if (!loading && !user) {
            router.push('/sign-in')
        }
    }, [user, loading])

    return (
        <div className='  '>
            <Header/>
            <div
                className='max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:fler-row items-center justify-center p-4 gap-2'>
                <div className='relative w-[240px] h-[180px] lg:w-[424px] lg:h-[324px] mb-8 lg:mb-0'>
                    <img className='rounded-lg'
                         src='https://i.pinimg.com/originals/2a/a7/26/2aa72665d3bfafbe4002fc69269f36ec.gif' alt='logo'/>
                </div>
                <div className='flex flex-col items-center gap-y-8 '>
                    <h1 className='text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center'>
                        Изучай, тренируй и закрепляй твои знания в языке с помощью <span className='text-[rgba(88,204,2,1)]'> Duolingo</span>
                    </h1>
                    <div className='flex flex-col gap-4 items-center text-center w-full max-w-[330px]'>
                        {loading && <Loader2Icon className='h-5 w-5 text-muted-foreground animate-spin'/>}


                        {user ? <>
                            <Avatar>
                                <AvatarImage/>
                                <AvatarFallback>{user?.userName.charAt(0).toUpperCase()}</AvatarFallback>


                            </Avatar>

                            <Button disabled={loading} asChild variant='secondary' size='lg'>
                                <Link href='/learn'>
                                    Продолжить учиться
                                </Link>
                            </Button>

                        </> : <div>

                                <Button disabled={loading} size='lg' className='w-full' variant='secondary'>
                                    <Link href='/sign-up'>
                                    Get started
                            </Link>
                                </Button>


                                <Button disabled={loading} size='lg' className='w-full' variant='ghost'>
                                    <Link href='/sign-in'>
                                    I already have an account
                                    </Link>
                                </Button>


                        </div>}


                    </div>
                </div>

            </div>
            <Footer/>
            <hr className='text-black bg-black'/>


            <div className="relative w-full overflow-clip">
                <Timeline data={scrollData}/>
            </div>
            <div className='mt-20  bg-[rgba(16,15,62)] mb-20 py-20'>

                <div className='flex items-center justify-center '>
                    <img className='w-[500px] h-[500px]'
                         src="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/22fce01f6df43e0472d7585afad9a43a.svg"
                         alt="hero-cion"/>

                </div>
                <div className='flex items-center flex-col gap-18  justify-center '>
                    <img className='w-[500px] mb-8 '
                         src="https://d35aaqx5ub95lt.cloudfront.net/images/splash/3a733db6d6873e1a915f70cf72554ce3.svg"
                         alt="hero-cion"/>
                    <button className='bg-white cursor-pointer hover:bg-neutral-600  text-black font-extrabold px-5 py-2 rounded-lg '>
                        Перейти в магазин
                    </button>

                </div>


            </div>

            <div className='mt-20 w-full '>
                <div className='text-center flex-col gap-3 w-full flex items-center justify-center relative'>
                    <div className='absolute top-0 flex flex-col gap-14 items-center justify-center'>
                        <h1 className='text-[rgba(88,204,2,1)] font-extrabold text-[60px]'>Изучайте языки с
                            <br/>
                            Duolingo</h1>
                        <Button variant='secondary'
                                className='text-xl font-semibold w-[200px] cursor-pointer '>Начать</Button>
                    </div>

                    <img className='w-full  '
                         src="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/890eb76de9a395b182c1c28322721405.svg"
                         alt="hero-cion"/>
                </div>

            </div>
            <div className='bg-[rgba(88,204,2,1)]'>


                <div className=' flex items-start py-20 justify-center gap-10'>
                    <div className='flex items-start flex-col gap-4 text-white cursor-pointer'>
                        <h1 className='text-white font-semibold '>О нас</h1>
                        <p className='text-white/40 font-semibold '>Курсы</p>
                        <p className='text-white/40  font-semibold'>Миссия</p>
                        <p className='text-white/40  font-semibold'>Методология</p>
                        <p className='text-white/40  font-semibold'>Эффективность</p>
                        <p className='text-white/40  font-semibold'>Ценности Duolingo</p>
                        <p className='text-white/40  font-semibold'>Исследования</p>
                        <p className='text-white/40  font-semibold'>Инвесторы</p>
                        <p className='text-white/40  font-semibold'>Связь с нами</p>
                    </div>
                    <div className='flex items-start flex-col gap-4 text-white cursor-pointer'>
                        <h1 className='text-white font-semibold '>Помощь и поддержка</h1>
                        <p className='text-white/40 font-semibold '>Справочный центр</p>
                        <p className='text-white/40  font-semibold'>Duolingo for Schools</p>
                        <p className='text-white/40  font-semibold'>Статус</p>

                    </div>
                    <div className='flex items-start flex-col gap-4 text-white cursor-pointer'>
                        <h1 className='text-white font-semibold '>Условия предоставления услуг</h1>
                        <p className='text-white/40 font-semibold '>Правила сообщества</p>
                        <p className='text-white/40  font-semibold'>Конфиденциальность</p>
                        <p className='text-white/40  font-semibold'>Условие</p>
                    </div>
                </div>
                <hr className='text-white font-semibold my-20'/>

                <h1 className='text-center text-white'>Языки:</h1>
            <Footer/>
            </div>
        </div>
    )
}
export default Page
