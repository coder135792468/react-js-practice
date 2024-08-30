import { useState } from "react";
import useDebounce from "../hooks/use-debouce";

const UseDebounce = () =>{
   const [text,setText] = useState('');
   
   const handleChange = (e)=>{
    console.log(e.target.value);
    setText(e.target.value);
   }
   const debounce = useDebounce(text,1000,()=>{
    console.log("API Fired");
   });
    
    return <div>
        <div>

        Value: {debounce}
        </div>
        <input type="text" placeholder="Enter..." value={text} onChange={handleChange}/>
    </div>

}

export default UseDebounce;