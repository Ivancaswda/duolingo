'use client'
import {lessons, units} from "../../../../db/schema";
import UnitBanner from "@/app/(main)/learn/UnitBanner";
import LessonButton from "@/app/(main)/learn/LessonButton";

type Props = {
    id: number;
    order: number;
    title: string;
    color?: string;
    description: string;
    lessons: (typeof  lessons.$inferSelect & {
        completed: boolean
    })[];
    activeLesson: typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
    } | undefined;
    activeLessonPercentage: number;
}

const Unit = ({id, order, title, description, lessons, activeLesson, activeLessonPercentage, color}: Props) => {

    console.log(activeLessonPercentage)

    return (
        <>
            <UnitBanner color={color} title={title} description={description}/>

            <div className='flex items-center flex-col relative'>
                {lessons.map((lesson, index) => {
                    const isCurrent = lesson.id === activeLesson?.id
                    const isLocked = !lesson.completed && !isCurrent; // future lesson thus it is locked
                    return (
                        <LessonButton key={lesson.id}
                                      id={lesson.id}
                                      totalCount={lessons.length - 1}
                                      index={index}
                                      locked={isLocked}
                                      percentage={activeLessonPercentage}
                                      current={isCurrent}
                        />
                    )

                })}
            </div>

        </>
    )
}
export default Unit