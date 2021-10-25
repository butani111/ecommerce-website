import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const options = {
  edit: false,
  color: "gray",
  activeColor: "blue",
  value: 3.5,
  isHalf: true,
  size: window.innerWidth < 600 ? 10 : 15,
};

const Product = ({ product }) => {
  return (
    <Link to="product._id" className="product-card">
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>(100 reviews)</span>
      </div>
      <span>{product.price} </span>
    </Link>
  );
};

export default Product;
