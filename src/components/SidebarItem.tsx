'use client'
import React from 'react'
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

type Props = {
    label: string,
    iconSrc: string,
    href: string
}

const SidebarItem = ({label, iconSrc, href}: Props) => {
    const pathname = usePathname()
    const active = pathname === href

    return (
        <Button asChild variant={active ? 'sidebarOutline' : 'sidebar'} className='justify-start h-[52px]'>
            <Link href={href}>
                <Image src={iconSrc} alt={label} width={30} height={30}/>
                {label}
            </Link>
        </Button>
    )
}
export default SidebarItem
