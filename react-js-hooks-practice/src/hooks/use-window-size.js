import { useEffect } from "react";
import { useState } from "react";

const useWindowSize = ()=>{
    const [curDimensions,setCurDimensions] = useState([window.innerWidth,window.innerHeight]);

    useEffect(()=>{
        window.addEventListener('resize',function(){
            setCurDimensions([window.innerWidth, window.innerHeight]);
        })
        return ()=>{
            window.removeEventListener('resize');
        }
    },[])

    return curDimensions;
}

export default useWindowSize;