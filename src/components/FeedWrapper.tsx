import React from 'react'

type Props = {
    children: React.ReactNode
}

const FeedWrapper = ({children}: Props) => {
    return (
        <div className=''>

            {children}
        </div>
    )
}
export default FeedWrapper
