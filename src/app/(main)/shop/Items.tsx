'use client'
import React, {useTransition} from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {refillHearts} from "../../../../actions/user-progress";
import {useUser} from "@clerk/nextjs";
import {toast} from "sonner";
import {createStripeUrl} from "../../../../actions/user-subscription";
import {points_to_refill} from "../../../../constant";
import {useAuth} from "../../../../context/useAuth";
import {InfinityIcon} from "lucide-react";
import Footer from "@/components/Footer";
type  Props = {
    hearts: number,
    points: number,
    hasActiveSubscription: boolean
}


const Items = ({hearts, points, hasActiveSubscription}: Props) => {
    const [pending, startTransition] = useTransition()
    const {user} = useAuth()
    console.log(points)
    console.log(pending)
    console.log(hearts)
    const onRefillHearts = () => {
        if (pending || hearts === 5 || points < points_to_refill) {
                return
        }

        startTransition(async () => {
            try {
                await refillHearts()
                toast.success('Сердца восстановлены!')
            } catch {
                toast.error('smth went wrong')
            }
        })
    }

    const onUpgrade =() => {
        startTransition(() => {
            createStripeUrl().then((resp) => {
                if (resp.data) {
                    window.location.href = resp.data
                }
            }).catch(() => toast.error('smth went wrong with stripe payment'))
        })
    }


    return (
        <ul className='w-full'>
            <div
                style={{
                    background: `
      radial-gradient(216% 106% at 6% 3%, rgba(38,246,99,0.3) 0%, rgba(108,138,255,0.3) 52%, rgba(252,85,255,0.3) 100%),
      rgb(0,4,55)
    `
                }}
                className="w-full relative overflow-x-hidden flex items-center p-4 rounded-xl justify-between"
            >
                <div className='w-[60%] text-white'>
                    <h1 className='text-2xl font-extrabold'>Оформите семейную подписку!</h1>
                    <p className='text-sm '>Учитесь вместе и экономьте на Duolingo prem</p>
                    <Button onClick={onUpgrade} className='text-2xl mt-4 px-10 py-6'>Оформить</Button>
                </div>
                <div className='w-[40%]'>
                    <img className='w-[400px] absolute top-10 right-[-200px]'
                         src="https://d35aaqx5ub95lt.cloudfront.net/images/super/0c25e40bb026a7dc4b49d715a7dc40e4.svg"
                         alt=""/>
                </div>

            </div>
            <h1 className='py-4 text-2xl font-semibold'>Жизни</h1>
            <hr className={'text-black'}/>

            <div className='flex items-center w-full px-6 py-3 gap-x-4 border-t-2'>
                <img src='https://d35aaqx5ub95lt.cloudfront.net/images/hearts/547ffcf0e6256af421ad1a32c26b8f1a.svg'
                     alt='heart' height={60} width={60}/>
                <div className='flex-1'>
                    <p className='text-neutral-700 w-full py-2 px-4  lg:text-xl'>Пополни сердца</p>
                    <p className='text-sm font-semibold px-4 text-neutral-700'>Восстановите максимум жизней и не
                        переживайте из-за допущенных ошибок.</p>

                </div>
                <Button onClick={onRefillHearts} disabled={pending || hearts === 5 || points < points_to_refill}>
                    {hearts === 5 ? 'Полные' : <div className='flex items-center gap-2'>
                        <img
                            src='https://d35aaqx5ub95lt.cloudfront.net/images/gems/45c14e05be9c1af1d7d0b54c6eed7eee.svg'
                            alt='points' width={20} height={20}
                        />
                        <p>{points_to_refill}</p>
                    </div>}
                </Button>
            </div>


            <div className='w-full px-6 py-3  gap-x-4 flex items-center border-t-2'>

                <img src='https://d35aaqx5ub95lt.cloudfront.net/images/hearts/4f3842c690acf9bf0d4b06e6ab2fffcf.svg'
                     alt='heart' height={60} width={60}/>
                <div className='flex-col w-full flex'>
                    <p className='text-neutral-700 w-full p-4 lg:text-xl'>Бесконечные жизни</p>
                    <p className='text-sm font-semibold px-4 text-neutral-700'>Super Duolingo: не беспокойтесь о
                        жизнях!</p>

                </div>

                <Button onClick={onUpgrade} disabled={pending}>
                    {hasActiveSubscription ? 'Настройки' : 'Обновить'}
                </Button>
            </div>
            <hr className={'text-black'}/>
            <h1 className='py-4 text-2xl font-semibold'>Усиления</h1>
            <div className='w-full px-6 py-3  gap-x-4 flex items-center border-t-2'>

                <img src='https://d35aaqx5ub95lt.cloudfront.net/images/leagues/d4280fdf64d66de7390fe84802432a53.svg'
                     alt='lock' height={60} width={60}/>
                <div className='flex-col w-full flex'>
                    <p className='text-neutral-700 w-full p-4 lg:text-xl'>Пока закрыто</p>
                    <p className='text-sm font-semibold px-4 text-neutral-700'>Ваш ожидает тут что-то интересное!</p>

                </div>

                <Button onClick={onUpgrade} disabled={pending}>
                    {hasActiveSubscription ? '' : ''}
                </Button>
            </div>
            <Footer/>

        </ul>
    )
}
export default Items
