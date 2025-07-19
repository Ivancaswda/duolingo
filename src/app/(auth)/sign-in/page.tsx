import React from 'react'
import AuthForm from "@/components/AuthForm";

const Page = () => {
    return (
        <div className="flex min-h-screen items-center justify-center px-4 ">
            <div>
                <img className='w-[320px] h-[200px]' src="https://i.pinimg.com/originals/29/28/87/292887401049fda6dac24026ed30abd6.png" alt="duolingo-hero"/>
            </div>
            <AuthForm mode="login"/>
        </div>
    )
}
export default Page
