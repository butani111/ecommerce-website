import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "gray",
    activeColor: "blue",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 10 : 15,
  };
  return (
    <Link
      to={`product/${product._id}`}
      className="product-card"
      key={product._id}
    >
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>({product.numOfReviews} reviews)</span>
      </div>
      <span>{`₹${product.price}`} </span>
    </Link>
  );
};

export default ProductCard;
