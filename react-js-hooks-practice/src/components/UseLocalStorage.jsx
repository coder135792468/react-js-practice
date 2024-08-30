import useLocalStorage from "../hooks/use-local-storage";

const UseLocalStorage = ()=>{
   const {value,set,remove} = useLocalStorage('user',false);
   return <div>
       <h1>{value?"Logged In":"Not logged In"}</h1>
       <button onClick={()=>set(()=>true)}>Login</button>
       <button onClick={()=>remove()}>Logout</button>
   </div>
}

export default UseLocalStorage;