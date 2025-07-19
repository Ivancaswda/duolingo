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
                        <Image src='/mascot_sad.svg' alt='mascot' width={80} height={80}/>
                    </div>
                    <DialogTitle className='text-center font-bold text-2xl'>
                        Wait, dont go
                    </DialogTitle>
                    <DialogDescription>
                        You about to leave the lesson are u sure
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Button variant='primary' className='w-full ' size='lg' onClick={close}>
                            Keep learneing
                        </Button>
                        <Button variant='dangerOutline' className='w-full ' size='lg' onClick={() => {
                            close()
                            router.push('/learn')
                        }}>
                            End session
                        </Button>
                    </div>


                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default ExitModal
