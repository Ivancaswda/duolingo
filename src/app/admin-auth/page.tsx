'use client'
import React, {useState} from 'react'
import AuthForm from "@/components/AuthForm";
import {GithubIcon, TwitterIcon} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {AdminLoginData} from "../../../constant";
import {redirect} from "next/navigation";
import {useAuth} from "../../../context/useAuth";
import {toast} from "sonner";

const Page = () => {

    const [email, setEmail] = useState()
    const {setIsAdmin} = useAuth()
    const [password, setPassword] = useState()
    const [isError, setIsError] = useState<boolean>(false)
    const [loading, setLoading]  = useState<boolean>(false)
    const handleSubmit = (e) => {
            e.preventDefault()

        if (email.trim() === AdminLoginData.email && password.trim() === AdminLoginData.password) {
            setIsAdmin(true)
            toast.success('Вы успешно вошли в аккаунт администратора!')
            redirect('/admin')
        } else {
            toast.error('Неправильные данные!')
            setIsError(true)
        }

    }

    return (
        <div className="flex min-h-screen md:flex-row flex-col items-center justify-center px-4 overflow-hidden ">
            <div>
                <Link href='/'>
                    <img className='w-[690px] h-[300px]'
                         src="https://i.pinimg.com/originals/29/28/87/292887401049fda6dac24026ed30abd6.png"
                         alt="duolingo-hero"/>
                </Link>

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
                {isError && <p className='text-left text-red-600'>Неправильные данные!</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[rgba(88,204,2,1)] cursor-pointer rounded text-white py-2  hover:bg-green-600 transition"
                >
                    {loading ? 'Загрузка...' :  'Войти' }
                </button>
                <div className='text-sm cursor-pointer flex md:flex-row flex-col cursor-pointer items-center gap-3 justify-center'>
                    <Link href={'/info'}>

                        <Button type='button' className='mx-auto hover:scale-105 transition'>
                            Как стать администратором?
                        </Button>

                    </Link>
                    <Link href={'/info'}>
                        <Button type='button' className='mx-auto hover:scale-105 transition'>
                            Как попасть в команду dualingo?
                        </Button>
                    </Link>

                </div>
                <div className='flex items-center justify-center w-full'>
                    <Link href='/shop'>
                        <Button type='button' className='mx-auto text-center  hover:scale-105 transition'>
                            Стать нашим спонсором?
                        </Button>

                    </Link>
                </div>


            </form>
        </div>
    )
}
export default Page

