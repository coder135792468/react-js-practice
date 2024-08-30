import { useState } from "react";

const isBrowser = typeof window !== undefined;
const useLocalStorage = (key,initialValue)=>{
  if(!isBrowser){
    return {
        initialValue,
        set:()=>{},
        remove:()=>{}
    };
  }

  if(!key){
    throw new Error('Can\'t Access Key of Undefined');
  }


  const hasValue = localStorage.getItem(key);
  const curValue = hasValue?JSON.parse(hasValue):initialValue;
  const [value,setValue] = useState(curValue);

  const set = (newValue)=>{
    try{
        const newValueToSet = newValue instanceof Function ? newValue(value): newValue;
        setValue(newValueToSet);
        localStorage.setItem(key,JSON.stringify(newValueToSet));
    }catch(err){
        console.log(err);
    }
  }
  
  const remove = ()=>{
    try{
       localStorage.removeItem(key);
       setValue(null);
    }catch(err){
        console.log(err);
    }
  }
  return {
    value,set,remove
  }
}

export default useLocalStorage;