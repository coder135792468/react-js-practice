import { useState } from "react";
import useThrottle from "../hooks/use-throttle";

const UseThrottle = () =>{
   const [text,setText] = useState('');
   
   const handleChange = (e)=>{
    console.log(e.target.value);
    setText(e.target.value);
   }
   const throttle = useThrottle(text,1000,()=>{
    console.log("API Fired");
   });
    
    return <div>
        <div>

        Value: {throttle}
        </div>
        <input type="text" placeholder="Enter..." value={text} onChange={handleChange}/>
    </div>

}

export default UseThrottle;