import React from 'react'
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useKey, useMedia} from "react-use";
import {CheckCircle, XCircle} from "lucide-react";

type Props = {
    onCheck: () => void;
    status: 'correct' | 'wrong' | 'none' | 'completed'
    disabled: boolean,
    lessonId: number
}
const QuizFooter = ({onCheck, status, disabled, lessonId}: Props) => {
    useKey('Enter', onCheck, {}, [onCheck])

    const isMobile = useMedia
    console.log(status)
    return (
        <footer className={cn('lg:h-[140px] h-[100px] border-t-2',
            status === 'correct' && 'border-transparent bg-green-100',
            status === 'wrong' && 'border-transparent bg-rose-100'
            )}>
            <div className='max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10'>

                {status === 'correct' && <div className='flex items-center text-green-500 font-bold text-base lg:text-2xl'>
                    <CheckCircle className='h-6 w-6 lg:h-10 lg:w-10 mr-4'/>
                    Молодец! Это правильно
                </div>}

                {status === 'wrong' && <div className='flex items-center text-rose-500 font-bold text-base lg:text-2xl'>
                    <XCircle className='h-6 w-6 lg:h-10 lg:w-10 mr-4'/>
                    Неправильно! Давай еще раз!
                </div>}
                {status === 'completed' && <Button variant='ghost'>Начать снова</Button>}
                <Button variant={status === 'wrong' ? 'danger' : 'secondary'} disabled={disabled} className='ml-auto' onClick={onCheck} size={isMobile ? 'sm' : 'lg'}>
                    {status === 'none' && 'Проверить'}
                    {status === 'correct' && 'Дальше'}
                    {status === 'wrong' && 'Еще раз'}
                    {status === 'completed' && 'Продолжить'}

                </Button>
            </div>

        </footer>
    )
}
export default QuizFooter
