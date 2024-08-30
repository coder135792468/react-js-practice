import { useRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
const UseImperativeHandler = ()=>{
   const childRef = useRef(null);
   
   return <div>
    <button onClick={()=>childRef.current.focusInput()}>Focus child Input</button>
    <ChildInput ref={childRef}/>
   </div>
}

const ChildInput = forwardRef((props,ref)=>{
    const inputRef = useRef(null);
    useImperativeHandle(ref,()=>{
        return{
            focusInput: ()=>inputRef.current.focus()
        }
    });
    return <input ref={inputRef} type='text' placeholder="Enter..."/>
});

export default UseImperativeHandler;