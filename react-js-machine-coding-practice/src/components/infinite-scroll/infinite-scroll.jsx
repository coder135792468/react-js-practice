import { useState,useEffect } from "react";
import "./infinite-scroll.css";

const PAGE_SIZE = 15;
const InfiniteScroll = () =>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${page * PAGE_SIZE}`);
            const productData = await res.json();
            setData([...data,...productData['products']]);
            setTotal(productData['total']);
        } catch (err) {
            console.log(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [page]);
    const throttle = (cb,delay)=>{
        let prev = Date.now();
        return (...args)=>{
            let cur = Date.now();
            if(Math.abs(prev-cur)< delay)return;
            prev = cur;
            return cb(...args);
        }
    }
    const handleChange = throttle(()=>{
       if(document.documentElement.scrollTop + window.innerHeight + 500 > document.documentElement.offsetHeight){
           console.log("Api Hits")
           if(!loading && page < Math.ceil(total/PAGE_SIZE))setPage(page + 1);
       }
    },500);
    useEffect(()=>{
        window.addEventListener('scroll',handleChange);
        return ()=>{
            window.removeEventListener('scroll',handleChange);
        }
    },[handleChange]);
   
    if (error) return <h1 style={{ textAlign: 'center' }}>There is some error</h1>

    return <div>
   <div className="product__container">
            {data?.map((product) => <div key={product.id} className="product__card">
                <img src={product.thumbnail} alt={product.title} className="product__cardImage" />
                <p>{product.title}</p>
            </div>)}
        </div>
        {loading&&<p>Loading....</p>}
    </div>;
}

export default InfiniteScroll;