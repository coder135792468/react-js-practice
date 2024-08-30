import { useEffect, useState } from "react";
import "./pagination.css";
import Paginate from "./paginate-button";

const PAGE_SIZE = 10;
//https://dummyjson.com/products?limit=10&skip=10
const PaginationLanding = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${page * PAGE_SIZE}`);
            const data = await res.json();
            setData(data['products']);
            setTotal(data['total']);
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
    if (loading) {
        return <p>Loading....</p>
    }
    if (error) return <h1 style={{ textAlign: 'center' }}>There is some error</h1>
    return <div>
        <div className="product__container">
            {data?.map((product) => <div key={product.id} className="product__card">
                <img src={product.thumbnail} alt={product.title} className="product__cardImage" />
                <p>{product.title}</p>
            </div>)}
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>

        <Paginate page={page} setPage={setPage} totalPages={Math.ceil(total / PAGE_SIZE)}/>
        </div>
    </div>
}

export default PaginationLanding;