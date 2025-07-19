import React from 'react'
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {InfinityIcon} from "lucide-react";
import {courses} from "../../db/schema";

type Props = {
    activeUsers: typeof  courses.$inferSelect;
    hearts: number;
    points: number;
    hasActiveSubscription: boolean

}

const UserProgress = ({activeCourse, hearts, points, hasActiveSubscription}: Props) => {

    if (!activeCourse) {
        return
    }

    return (
        <div className='flex items-center justify-between gap-x-2 w-full'>
            <Link href='/courses'>
                <Button variant='ghost'>
                    <Image src={activeCourse?.imageSrc}
                           alt={activeCourse.title}
                           className='rounded-md border'
                           width={32}
                           height={32}
                    />
                </Button>

            </Link>
            <Link href='/shop'>
                <Button variant='ghost' className='text-orange-500'>
                    <Image className='mr-2' src='/points.png' width={28} height={28} alt='points'/>
                    {points}
                </Button>
            </Link>
            <Link href='/shop'>
                <Button variant='ghost' className='text-rose-500'>
                    <Image className='mr-2' src='/heart.png' width={28} height={28} alt='Hearts'/>
                    {hasActiveSubscription? <InfinityIcon className='h-4 w-4 stroke-3'/> : hearts}
                </Button>
            </Link>
        </div>
    )
}
export default UserProgress
