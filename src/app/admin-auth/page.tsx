'use client'
import React, {useState} from 'react'
import AuthForm from "@/components/AuthForm";
import {GithubIcon, TwitterIcon} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const Page = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading]  = useState<boolean>(false)
    const handleSubmit = () => {

    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 ">
            <div>
                <img className='w-[320px] h-[200px]'
                     src="https://i.pinimg.com/originals/29/28/87/292887401049fda6dac24026ed30abd6.png"
                     alt="duolingo-hero"/>
            </div>
            <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto space-y-4">
                <h2 className="text-2xl font-bold text-center">
                      Войти как администратор
                </h2>



                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 rounded text-white py-2  hover:bg-green-600 transition"
                >
                    {loading ? 'Загрузка...' :  'Войти' }
                </button>
                <div className='text-sm cursor-pointer'>
                    <Link href={'/info'}>

                        <Button>
                            Как стать администратором?
                        </Button>
                    </Link>
                </div>

            </form>
        </div>
    )
}
export default Page

