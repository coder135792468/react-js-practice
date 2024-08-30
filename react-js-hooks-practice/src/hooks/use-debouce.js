import { useEffect } from "react";
import { useState } from "react";


const useDebounce = (value,delay,callBack = ()=>{})=>{
    const [debounceValue,setDebounceValue] = useState(value);

    useEffect(()=>{
        const handleVaue = setTimeout(()=>{
            setDebounceValue(value);
            callBack();
        },delay);
        return ()=>{
            clearTimeout(handleVaue);
        }
    },[value]);
    
    return debounceValue;
}

export default useDebounce;