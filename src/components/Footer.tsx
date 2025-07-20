import React from 'react'
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {ArrowLeftIcon, ArrowRightIcon} from "lucide-react";

const Footer = () => {
    return (
        <footer className='hidden lg:block h-20 w-full border-r-2 border-slate-200 p-2'>
            <div className='max-w-screen-lg mx-auto flex items-center justify-evenly h-full'>
                <ArrowLeftIcon width={50} height={50} className='text-gray-700 hover:bg-gray-100 cursor-pointer p-3  transition   rounded-full'/>
                <Button size='lg' variant='ghost' className=''>
                    <img src='https://avatars.mds.yandex.net/i?id=99457965b47473d5de2c4c5c995bc5b03d1795a3-3833005-images-thumbs&n=13' alt='Russian' height={32} width={40} className='mr-4 rounded-md'/>
                    Russian
                </Button>
                <Button size='lg' variant='ghost' className=''>
                    <img src='https://avatars.mds.yandex.net/i?id=836e1685fcf859c304f3cd497c775891be979b83-7904189-images-thumbs&n=13' alt='German' height={32} width={40} className='mr-4 rounded-md'/>
                    German
                </Button>
                <Button size='lg' variant='ghost' className=''>
                    <img src='https://avatars.mds.yandex.net/i?id=39bf896f2d87d151802721f2555bfa65b3fca9bd-5221134-images-thumbs&n=13' alt='Greek' height={32} width={40} className='mr-4 rounded-md'/>
                    Greek
                </Button>
                <Button size='lg' variant='ghost' className=''>
                    <img src='https://avatars.mds.yandex.net/i?id=dde998c2b5528ce66d0ec358f1e139f19fb9657d-5869106-images-thumbs&n=13' alt='Italian' height={32} width={40} className='mr-4 rounded-md'/>
                    Italian
                </Button>
                <Button size='lg' variant='ghost' className=''>
                    <img src='https://avatars.mds.yandex.net/i?id=815777ed37ca30c730c3d74b41848114751026f3-11942902-images-thumbs&n=13' alt='Russian' height={32} width={40} className='mr-4 rounded-md'/>
                    Finnish
                </Button>
                <ArrowRightIcon width={50} height={50} className='text-gray-700 hover:bg-gray-100 transition cursor-pointer p-3  rounded-full'/>
            </div>
        </footer>
    )
}
export default Footer
