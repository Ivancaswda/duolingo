import React from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Promo = () => {
    return (
        <div className='border-2 rounded-xl p-4 space-y-4'>
            <div className='space-y-2'>
                <div className='flex items-center gap-x-2'>
                    <Image src='/unlimited.png' alt='pro'
                    width={26} height={26}
                    />
                    <h3 className='font-bold text-lg'>Обнови до Премиума</h3>

                </div>
                <p className='text-muted-foreground'>
                   Получи бесконечные сердца и многое другое!
                </p>
            </div>

            <Button asChild className='w-full'  variant='super'>
                <Link href='/shop'>
                    Обновить сейчас!
                </Link>
            </Button>
        </div>
    )
}
export default Promo
