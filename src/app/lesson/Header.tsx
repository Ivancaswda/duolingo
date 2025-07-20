import React from 'react'
import {Infinity, XIcon} from "lucide-react";
import {Progress} from "@/components/ui/progress";
import Image from "next/image";
import {useExitModal} from "../../../store/use-exit-modal";
type Props = {
    hearts: number,
    percentage: number,
    hasActiveSubscription: boolean
}

const Header = ({hearts, percentage, hasActiveSubscription}: Props) => {

    const {open} = useExitModal()

    return (
        <header className='lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 mx-auto justify-between items-center max-w-[1140px]'>
            <XIcon onClick={open} className='text-slate-500 hover:opacity-75 transition cursor-pointer'/>

            <Progress value={percentage}/>
            <div className='text-rose-500 flex items-center font-bold'>
                    <Image alt='heart' src='https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg' width={28} height={28} className='mr-2'/>
                {hasActiveSubscription ? <Infinity className='h-6 w-6 stroke-[3] shrink-0'/> : hearts}
            </div>


        </header>
    )
}
export default Header
