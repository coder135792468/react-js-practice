import { useEffect } from "react";
import { useRef } from "react";


const isEqual = (arr1,arr2)=>{
  if(!arr1)return false;
  if(arr1.length != arr2.length)return false;
  for(let i = 0;i<arr1.length;i++){
    if(arr1[i] != arr2[i])return false;
  }
  return true;
}
const useCustomMemo = (callback,deps) =>{
  const prevRefs = useRef(null);

  useEffect(()=>{
    return ()=>{
        prevRefs.current = null;
    }
  },[]);

  if(prevRefs.current == null){
    prevRefs.current = {value:callback(),deps};
    return prevRefs.current.value;
  }
  
  const depsChanges = !isEqual(prevRefs.current.deps,deps);
  if(depsChanges){
    prevRefs.current = {value:callback(), deps};
  }

 
  return prevRefs.current.value;
}

export default useCustomMemo;