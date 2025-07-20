import Sidebar from "@/components/Sidebar";

type Props = {
    children: React.ReactNode
}

import React from 'react'
import MobileHeader from "@/components/MobileHeader";
import ProtectedRoute from "@/components/ProtectedRoute";

const Layout = ({children}: Props) => {
    return (
        <>



                <MobileHeader/>
                <Sidebar className='hidden lg:flex'/>
                <main className='lg:pl-[256px] pt-[50px] lg:pt-0 h-full'>
                    <div className=' flex items-center justify-center   max-w-[1456px] mx-auto pt-6'>
                        {children}
                    </div>
                </main>

        </>
    )
}
export default Layout
