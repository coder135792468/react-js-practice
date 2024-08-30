import { useEffect } from "react";
import { useRef } from "react"

const isEqual = (arr1,arr2)=>{
    if(!arr1)return false;
    if(arr1.length != arr2.length)return false;
    for(let i = 0;i<arr1.length;i++){
      if(arr1[i] != arr2[i])return false;
    }
    return true;
}
const useCustomCallBack = (func,deps) =>{
  const prevDefs = useRef(null);

  //clean when components unmount
  useEffect(()=>{
    return ()=>{
        prevDefs.current = null;
    }
  },[]);
  if(prevDefs.current == null){
    prevDefs.current = {
        func,
        deps
    };
    return prevDefs.current.func;
  }
  const depsChange = !isEqual(prevDefs.deps, deps);
  if(depsChange){
    prevDefs.current = {
        func,
        deps
    }
  }
  return prevDefs.current.func;
}

export default useCustomCallBack;