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
                        <Image src='/HEARTS.svg' alt='mascot' width={80} height={80}/>
                    </div>
                    <DialogTitle className='text-center font-bold text-2xl'>
                       pRACTICE LESSON
                    </DialogTitle>
                    <DialogDescription>
                        use practice lesson to regain hearts and points and u cannot loose hearts or point
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Button onClick={close} variant='primary' className='w-full ' size='lg' >
                           Got it\
                        </Button>

                    </div>


                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default PracticeModal
