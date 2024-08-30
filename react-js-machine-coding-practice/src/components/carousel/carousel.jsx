import "./image-carousel.css";
import withFetch from "./hooks/with-fetch";
import ImageCarousel from "./image-carousel";

//https://jsonplaceholder.typicode.com/photos?_limit=2
function Carousel({ loading, error, data }) {
  if (loading) return <p align="center">Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Something wents wrong</p>;
  return (
    <div>
      <ImageCarousel images={data?.map((product) => product.thumbnail)} />
    </div>
  );
}

export default withFetch(
  "https://dummyjson.com/products?limit=5",
  "products"
)(Carousel);
