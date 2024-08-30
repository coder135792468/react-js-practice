import { useRef } from "react";
import useInteractionObserver from "../hooks/use-interaction-observer";
import { useMemo } from "react";


const UseInteractionObserver = ()=>{
    const curRef = useRef(null);
    const options = useMemo(()=>({
        root:null,
        rootMargin: "0px",
        threshold: 0.5
    }),[]);
    const observer = useInteractionObserver(curRef,options);
    //checking interactin here
    console.log(observer?.isIntersecting);
    
    return <div style={{width:'100%',height:'1500px',background:'grey'}}>
        <div ref={curRef} style={{background:"blue", height:'500px', marginTop:'100vh'}}>Hello</div>
    </div>
}

export default UseInteractionObserver;