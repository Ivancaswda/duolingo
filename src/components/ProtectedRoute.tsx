// components/ProtectedRoute.tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/useAuth'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/sign-in')
        }
    }, [user, loading])

    if (loading || !user) return null // или спиннер

    return <>{children}</>
}

export default ProtectedRoute
