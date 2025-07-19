import React from 'react'
import {useAuth} from "../../../../context/useAuth";
import {getCourses, getUserProgress} from "../../../../db/queries";
import List from "@/components/List";
import getServerUser from "@/lib/auth-server";
import {Loader2Icon} from "lucide-react";



const CoursePage = async () => {


    const user = await getServerUser()
    console.log(user)
    if (!user) {
        return  (
            <div className='flex items-center justify-center w-full h-full '>
                <Loader2Icon className='animate-spin text-green-500'/>
            </div>
        )
    }



    const data = await getCourses()

    const userProgress = await getUserProgress()


    return (
        <div className='max-w-[912px] px-3 mx-auto h-full'>
            <h1 className='text-2xl font-semibold text-neutral-700'>
                Language de
            </h1>
            <List  courses={data} activeCourseId={userProgress?.activeCourseId} />

        </div>
    )
}
export default CoursePage
