import { useEffect } from "react";
import { useState } from "react";


const useInteractionObserver = (inputRef,options)=>{
    const [interactionState,setInteractionState] = useState(null);
    useEffect(()=>{
      if(inputRef.current && typeof IntersectionObserver === 'function'){
        const handleChange = (entries)=>{
             setInteractionState(entries[0]);
        }
        const observer = new IntersectionObserver(handleChange,options);
        observer.observe(inputRef.current);
        return ()=>{
            setInteractionState(null);
            observer.disconnect();
        }
    }
    },[inputRef,options]);

    return interactionState;
}

export default useInteractionObserver;