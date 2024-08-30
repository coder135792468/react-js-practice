// import { useMemo } from "react";
import { useState } from "react"
import useCustomMemo from "../hooks/use-memo";

const UseMemo = ()=>{
  const [count,setCount] = useState(0);
  const [count1,setCount1] = useState(0);
  const getCalc = ()=>{
    console.log("Calculation Proceed.....");
    return count*2;
  };
//   const getCalculation = useMemo(getCalc,[count]);
// using custom hook now
const getCalculation = useCustomMemo(getCalc,[count]);
    return <div>
        <h1>Count: {getCalculation}</h1>
        <h1>Count1 : {count1}</h1>
        <button onClick={()=>setCount(count + 1)}>Increase 1</button>
        <button onClick={()=>setCount1(count1 + 1)}>Increase 2</button>
    </div>
}

export default UseMemo;