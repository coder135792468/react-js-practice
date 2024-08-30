import { useReducer } from "react";

const myReducer = (state,action)=>{
  switch (action.type) {
    case 'INCREMENT':
        return{
            ...state,
            count: state.count + 1
        }
    default:
        return state;
  }
};
const UseReducer = ()=>{
    const initalState = {count : 0}
    const [state,dispatch] = useReducer(myReducer,initalState);

    console.log(state);
    return <div>
        <h1>Counter:{state.count}</h1>
        <button onClick={()=>dispatch({type:'INCREMENT'})}>Increase</button>
    </div>
}

export default UseReducer;