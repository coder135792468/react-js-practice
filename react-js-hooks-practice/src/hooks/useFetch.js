import { useEffect } from "react";
import { useState } from "react";

const useFetch = (url)=>{
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                setLoading(true);
                const res = await fetch(url);
                const data = await res.json();
                setData(data);
            }catch(err){
                setError(true);
            }finally{
                setLoading(false);
            }
        };
     fetchData();
    },[url]);

    return{
        data,loading,error
    };
}

export default useFetch;