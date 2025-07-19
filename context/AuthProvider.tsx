// context/AuthContext.tsx
'use client'
import { createContext, useContext, useEffect, useState } from "react"
import {useRouter} from "next/navigation";
import {toast} from "sonner";

interface User {
    email: string
    userName: string
    credits: number
}

interface AuthContextType {
    user: User | null
    setUser: () => void
    loading: boolean
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: () => {},
    setUser: () => {}
})
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/user", {
                    method: "GET",
                    credentials: "include", // ⬅️ ОБЯЗАТЕЛЬНО
                })

                if (res.ok) {
                    const data = await res.json()
                    setUser(data.user)
                } else {
                    setUser(null)
                }
            } catch (err) {
                console.error("Fetch user error", err)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
        router.push("/sign-in")
        toast.success("Вы вышли с аккаунта!")
    }

    return (
        <AuthContext.Provider value={{ user, loading, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
