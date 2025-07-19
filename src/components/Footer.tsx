import React from 'react'
import {Button} from "@/components/ui/button";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className='hidden lg:block h-20 w-full border-r-2 border-slate-200 p-2'>
            <div className='max-w-screen-lg mx-auto flex items-center justify-evenly h-full'>
                <Button size='lg' variant='ghost' className=''>
                    <Image src='/hr.gg' alt='Russian' height={32} width={40} className='mr-4 rounded-md'/>
                    Russian
                </Button>
                <Button size='lg' variant='ghost' className=''>
                    <Image src='/hr.gg' alt='Russian' height={32} width={40} className='mr-4 rounded-md'/>
                    German
                </Button>
                <Button size='lg' variant='ghost' className=''>
                    <Image src='/hr.gg' alt='Russian' height={32} width={40} className='mr-4 rounded-md'/>
                    Spanish
                </Button>
                <Button size='lg' variant='ghost' className=''>
                    <Image src='/hr.gg' alt='Russian' height={32} width={40} className='mr-4 rounded-md'/>
                    English
                </Button>
                <Button size='lg' variant='ghost' className=''>
                    <Image src='/hr.gg' alt='Russian' height={32} width={40} className='mr-4 rounded-md'/>
                    Finnish
                </Button>
            </div>
        </footer>
    )
}
export default Footer
