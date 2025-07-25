import React from 'react'
import Image from "next/image";
type Props = {
    question: string
}

const QuestionBubble = ({question}: Props) => {
    return (
        <div className='flex items-center gap-x-4 mb-6'>
            <img src={'https://avatars.mds.yandex.net/i?id=ee9021e1c866277fa63ffec83e543330_l-9202550-images-thumbs&n=13'} alt='mascot' width={60} height={60} className='hidden rounded-lg lg:block'/>
            <img src={'https://avatars.mds.yandex.net/i?id=ee9021e1c866277fa63ffec83e543330_l-9202550-images-thumbs&n=13'} alt='mascot' width={40} height={40} className='lg:hidden rounded-lg block'/>
            <div className='relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base'>
                {question}
                <div className='absolute -left-3
                top-1/2 w-0 h- border-x-8 border-x-transparent
                border-t-8 transform -translate-y-1/2 rotate-90 '/>
            </div>
        </div>
    )
}
export default QuestionBubble
