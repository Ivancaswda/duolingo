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
import {useExitModal} from "../../../store/use-exit-modal";
import Image from "next/image";
import {Button} from "@/components/ui/button";

const ExitModal = () => {

    const router = useRouter()
    const [isClient, setIsClient] = useState(false)

    const {isOpen, close} = useExitModal()
    useEffect(() => setIsClient(true), [])


    if (!isClient) return  null

    return (
        <Dialog onOpenChange={close} open={isOpen}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <div className='flex items-center w-full justify-center mb-5'>
                        <Image src='https://d35aaqx5ub95lt.cloudfront.net/images/ed9f592a37a6ce248be0beec9c13a0e1.svg' alt='mascot' width={120} height={120}/>
                    </div>
                    <DialogTitle className='text-center font-bold text-2xl'>
                        Постойте! Куда же вы? Если закончить сейчас, прогресс не сохранится.
                    </DialogTitle>

                </DialogHeader>
                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Button variant='primary' className='w-full ' size='lg' onClick={close}>
                            Продолжить учёбу
                        </Button>
                        <Button variant='dangerOutline' className='w-full ' size='lg' onClick={() => {
                            close()
                            router.push('/learn')
                        }}>
                           Выйти
                        </Button>
                    </div>


                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default ExitModal
