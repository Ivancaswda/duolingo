'use client'
import {useAuth} from "../../context/useAuth";



export const getIsAdmin =  () => {

    const {isAdmin} = useAuth()


    return isAdmin
}