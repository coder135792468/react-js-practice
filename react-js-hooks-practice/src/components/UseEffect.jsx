import { useState, useEffect } from "react";
import useCustomEffect from "../hooks/use-effect";
const UseEffect = ()=>{
  const [count,setCount] = useState(0);
  const [count1,setCount1] = useState(0);

  useCustomEffect(()=>{
    console.log("Count updated");
  },[count]);
  return (
    <div>
      <h1>Count: {count}</h1>
      <h1>Count2: {count1}</h1>
      <button onClick={()=>setCount(count+1)}>Increase</button>
      <button onClick={()=>setCount1(count1 + 1)}>Increase count2</button>
    </div>
  )
}

export default UseEffect;