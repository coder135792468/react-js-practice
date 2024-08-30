import useFetch from "../hooks/useFetch";

const UseFetch = ()=>{
   
    const {data,loading,error} = useFetch('https://jsonplaceholder.typicode.com/posts');
    
    if(error)return <h1>This is some error going on....</h1>
    if(loading)return <p>Loading...</p>

    return <div>
        {data?.map(post=><div key={post.id} style={{border:'1px solid black', margin:10}}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>)}
    </div>

}

export default UseFetch;