'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {usePracticeModal} from "../../../store/use-practice-modal";
import Image from "next/image";
import {Button} from "@/components/ui/button";

const PracticeModal = () => {


    const [isClient, setIsClient] = useState(false)

    const {isOpen, close} = usePracticeModal()
    useEffect(() => setIsClient(true), [])


    if (!isClient) return  null

    return (
        <Dialog onOpenChange={close} open={isOpen}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <div className='flex items-center w-full justify-center mb-5'>
                        <Image src='https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg' alt='mascot' width={40} height={80}/>
                        <Image src='https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg' alt='mascot' width={40} height={80}/>
                        <Image src='https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg' alt='mascot' width={40} height={80}/>
                        <Image src='https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg' alt='mascot' width={40} height={80}/>

                        <Image src='https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg' alt='mascot' width={40} height={80}/>

                    </div>
                    <DialogTitle className='text-center font-bold text-2xl'>
                       Урок для практики
                    </DialogTitle>
                    <DialogDescription>
                       Используй такие уроки чтобы получать алмазы за которые ты можешь восполнять свои сердца</DialogDescription>
                </DialogHeader>
                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Button onClick={close} variant='primary' className='w-full ' size='lg' >
                           Понятно
                        </Button>

                    </div>


                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default PracticeModal
