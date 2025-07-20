'use client'
import {TwitterIcon, GithubIcon} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface AuthFormProps {
    mode: 'login' | 'register'
}

function AuthForm({ mode }: AuthFormProps) {
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const url = mode === 'login' ? '/api/auth/sign-in' : '/api/auth/sign-up'
        const payload =
            mode === 'login'
                ? { email, password }
                : { email, password, userName }

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.error || 'Something went wrong')
                setLoading(false)
                return
            }

            localStorage.setItem('token', data.token)
            toast.success(mode === 'login' ? 'Успешный вход!' : 'Регистрация прошла успешно!')
            router.push('/')
        } catch (err) {
            toast.error('Ошибка при запросе')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-center">
                {mode === 'login' ? 'Вход' : 'Регистрация'}
            </h2>

            {mode === 'register' && (
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            )}

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
                className="w-full bg-[rgba(88,204,2,1)] rounded text-white py-2  hover:bg-[rgba(88,204,2,1)]/80 transition"
            >
                {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </button>
            <div className='flex items-center gap-2'>
                <button className="w-full flex items-center gap-3 justify-center bg-black text-white  rounded py-1 px-2">
                    <GithubIcon size={30}/>
                    github
                </button>
                <button className="w-full flex items-center gap-3 justify-center border-black border-[3px] rounded  py-1 px-2" >
                    <TwitterIcon size={30}/>
                    Twitter
                </button>
            </div>
            <div className='text-sm cursor-pointer'>
                {mode === 'register' ?   <Link href='/sign-in'>

                    У вас уже есть аккаунт? Войти
                </Link> : <Link href='/sign-up'>
                    Впервые на duolingo? Зарегистироваться
                </Link>}


            </div>

        </form>
    )
}

export default AuthForm