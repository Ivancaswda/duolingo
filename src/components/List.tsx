'use client'
import React, {useTransition} from 'react'
import {courses, userProgress} from "../../db/schema";
import {useRouter} from 'next/navigation'
import Card from "@/components/Card";
import {upsertUserProgress} from "../../actions/user-progress";

import {useAuth} from "../../context/useAuth";

type Props = {
    courses: typeof courses.$inferSelect[],
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId
}

const List = ({courses, activeCourseId}: Props) => {
    const {user} =  useAuth()
    const router = useRouter()
    const [pending, startTransition] = useTransition()

    const onClick = (id: number) => {
        if (pending) return

        if (id === activeCourseId) {
            return router.push('/learn')
        }

        startTransition(() => {
            upsertUserProgress({
                courseId: id,
                userId: user?.userId,
                userName: user?.userName,
            })
        })

    }

    return (
        <div className='pt-6 grid grid-cols-2 gap-4 lg:grid-cols-[repeat(auto-fill, minmax(210px,1fr)]'>
            {courses.map((course) => (
                <Card key={course.id}
                      id={course.id}
                      title={course.title}
                      imageSrc={course.imageSrc || ''}
                      onClick={onClick}
                      disabled={false}
                      active={course.id === activeCourseId}
                />
            ))}
        </div>
    )
}
export default List
