import React from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {quests} from "../../constant";
import {Progress} from "@/components/ui/progress";

type Props = {
    points: number;

}

const Quests = ({points}: Props) => {
    return (
        <div className='border-2 rounded-xl p-4 space-y-4'>
           <div className='flex items-center justify-between w-full space-y-2'>
               <h3 className='font-bold text-lg'>
                   Задания
               </h3>
               <Link href='/quests'>
                   <Button size='sm' variant='primaryOutline'>
               Посмотреть все
                   </Button>
               </Link>
           </div>


                <ul className='w-full space-y-4'>
                    {quests.map((quest, index) => {
                        const progress = (points / quest.value) * 100
                        return (
                            <div key={index} className='flex items-center w-full pb-4 gap-x-3 '>
                                <Image src='https://d35aaqx5ub95lt.cloudfront.net/images/gems/45c14e05be9c1af1d7d0b54c6eed7eee.svg'
                                       alt='points'
                                       width={40}
                                       height={40}
                                />
                                <div className='flex flex-col gap-y-2 w-full'>
                                    <p className='text-neutral-700 text-sm font-bold'>
                                        {quest.title}
                                    </p>
                                    <Progress value={progress} className='h-2'/>
                                </div>
                            </div>
                        )
                    })}
                </ul>

        </div>
    )
}
export default Quests
