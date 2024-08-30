import { useState } from "react";
import { createContext, useContext } from "react";

const DataContext = createContext(null);

const Name = ()=>{
    const {data} = useContext(DataContext);
    return <div>{data.firstName} {data.lastName}</div>
};

const UseContext = ()=>{
    const [data,setData] = useState({
        firstName:"John",
        lastName:"Doe"
    });

    return <DataContext.Provider value={{data,setData}}>
        <Name/>
    </DataContext.Provider>
}

export default UseContext;