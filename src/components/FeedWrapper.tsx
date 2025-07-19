import React from 'react'

type Props = {
    children: React.ReactNode
}

const FeedWrapper = ({children}: Props) => {
    return (
        <div className='flex relative top-0 pb-10'>

            {children}
        </div>
    )
}
export default FeedWrapper
