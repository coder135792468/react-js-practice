import { useState } from "react";
import "./image-carousel.css";

const ImageCarousel = ({ images }) => {
  const [curIndex, setCurIndex] = useState(0);
  return (
    <div className="carousel-container">
      <button
        onClick={() =>
          setCurIndex((curIndex - 1 + images.length) % images.length)
        }
      >
        Prev
      </button>
      <div className="image-container">
        {images.map((imageUrl, index) => (
          <img
            key={index}
            style={{ display: `${index === curIndex ? "block" : "none"}` }}
            src={imageUrl}
            alt={"thumbnail"}
          />
        ))}
      </div>
      <button onClick={() => setCurIndex((curIndex + 1) % images.length)}>
        Next
      </button>
    </div>
  );
};

export default ImageCarousel;
