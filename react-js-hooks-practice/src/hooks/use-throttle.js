import { useEffect } from "react";
import { useState, useRef } from "react"

const useThrottle = (value,delay,callback)=>{
    const [throttleValue,setThrottleValue] = useState(value);
    const prevTime = useRef(Date.now());
    useEffect(()=>{
        const handleChange = setTimeout(()=>{
           const now = Date.now();
           if(Math.abs(now-prevTime.current) >= delay){
              setThrottleValue(value);
              callback();
              prevTime.current = now;
           }
        },delay - (Date.now() - prevTime.current));

        return ()=>{
            clearTimeout(handleChange);
        }
    },[value]);
    return throttleValue;
}

export default useThrottle;