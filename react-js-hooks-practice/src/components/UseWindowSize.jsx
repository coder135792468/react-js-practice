import useWindowSize from "../hooks/use-window-size";

const UseWindowSize = ()=>{
    const [width,height] = useWindowSize();

    return <div>
       <p>
        <strong>Width:</strong>{width}
        <br/>
        <strong>Height:</strong>{height}
       </p>
    </div>
}

export default UseWindowSize;