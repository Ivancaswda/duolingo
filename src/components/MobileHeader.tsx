import React from 'react'
import MobileSidebar from "@/components/MobileSidebar";

const MobileHeader = () => {
    return (
        <nav className='lg:hidden bg-green-500 px-6 h-[50px] flex items-center border-b fixed top-0 w-full '>
            <MobileSidebar/>
        </nav>
    )
}
export default MobileHeader
