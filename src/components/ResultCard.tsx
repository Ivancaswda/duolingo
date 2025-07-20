import React from 'react'
import {cn} from "@/lib/utils";
import Image from "next/image";
type Props = {
    value: number,
    variant: "points" | 'hearts'
}
const ResultCard = ({value, variant}: Props) => {
    const imageSrc = variant === 'hearts' ? 'https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg' : 'https://d35aaqx5ub95lt.cloudfront.net/images/gems/45c14e05be9c1af1d7d0b54c6eed7eee.svg'

    return (
        <div className={cn('rounded-2xl border-2 w-full', variant === 'points' && 'bg-orange-400 border-orange-400',

            variant === 'hearts' && 'bg-rose-500 border-rose-500')}>
            <div className={cn('p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs',
                variant=== 'hearts' && 'bg-rose-500',
                variant === 'points' && 'bg-orange-400')}>
                {variant === 'hearts' ? 'hearts left' : 'points left'}

            </div>

            <div className={cn('rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg',
                variant === 'hearts' && 'border-rose-500 ',
            variant === 'points' && 'border-orange-500')}>
            <Image src={imageSrc} alt='icon' height={30} width={30} className={'mr-1.5'}/>
                {value}
            </div>

        </div>
    )
}
export default ResultCard
