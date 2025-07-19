import React from 'react'
import {Loader2Icon} from "lucide-react";

const Loading = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <Loader2Icon className='h-6 w-6 text-muted-foreground animate-spin'/>
        </div>
    )
}
export default Loading
