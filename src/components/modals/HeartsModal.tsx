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
import {useHeartsModal} from "../../../store/use-hearts-modal";
import Image from "next/image";
import {Button} from "@/components/ui/button";

const HeartsModal = () => {

    const router = useRouter()
    const [isClient, setIsClient] = useState(false)

    const {isOpen, close} = useHeartsModal()
    useEffect(() => setIsClient(true), [])


    if (!isClient) return  null

    return (
        <Dialog onOpenChange={close} open={isOpen}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <div className='flex items-center w-full justify-center mb-5'>
                        <Image src='/mascot_bad.svg' alt='mascot' width={80} height={80}/>
                    </div>
                    <DialogTitle className='text-center font-bold text-2xl'>
                        Wait, dont go
                    </DialogTitle>
                    <DialogDescription>
                        Yuy run out of hearts
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Button onClick={() => {
                            close()
                            router.push('/store')
                        }} variant='primary' className='w-full ' size='lg' >
                            Get unlimited hearts
                        </Button>
                        <Button variant='dangerOutline' className='w-full ' size='lg' onClick={close}>
                           No thanks
                        </Button>
                    </div>


                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default HeartsModal
