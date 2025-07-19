import Sidebar from "@/components/Sidebar";

type Props = {
    children: React.ReactNode
}

import React from 'react'
import MobileHeader from "@/components/MobileHeader";

const Layout = ({children}: Props) => {
    return (
        <>
            <MobileHeader/>
            <Sidebar className='hidden lg:flex'/>
            <main className='lg:pl-[256px] pt-[50px] lg:pt-0 h-full'>
                <div className='h-full max-w-[1056px] mx-auto pt-6'>
                    {children}
                </div>
            </main>
        </>
    )
}
export default Layout
