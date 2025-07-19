import React from 'react'
import {cn} from "@/lib/utils";
import {Check} from "lucide-react";
import Image from "next/image";

type Props = {
    title: string,
    id: number,
    onClick: (id: number) => void;
    disabled?: boolean,
    imageSrc?: string,
    active?: boolean

}
const Card = ({title, id,  disabled, onClick, active, imageSrc}: Props) => {
    return (
        <div  className={cn("h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col justify-between p-3 pb-6 min-h-[217px] min-w-[200px]", disabled && 'pointer-events-none opacity-50')}
              onClick={() => onClick(id)}>
            <div className='min-h-[24px] w-full flex items-center justify-end '>
                {active && <div className='bg-green-600 mr-2 rounded-full flex items-center justify-center p-1.5'>
                    <Check className='text-white stroke-4 h-4 w-4'/>
                </div>}
                <Image src={imageSrc} alt={title} width={80} height={80} className='rounded-lg drop-shadow-md border object-cover'/>
                <p className='text-neutral-700 text-center font-bold mt-3 '>{title}</p>
            </div>
        </div>
    )
}
export default Card
