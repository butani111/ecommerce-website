import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    size: window.innerWidth < 1000 ? "small" : "medium",
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link
      to={`product/${product._id}`}
      className="product-card"
      key={product._id}
    >
      {
        //show first image
        product.images &&
          product.images.map(
            (item, i) => i === 0 && <img src={item.url} alt={product.name} />
          )
      }
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="product-card-review">
          ({product.numOfReviews} reviews)
        </span>
      </div>
      <span>{`₹${product.price}`} </span>
    </Link>
  );
};

export default ProductCard;
