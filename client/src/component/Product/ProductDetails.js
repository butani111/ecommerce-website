import React, { useEffect } from "react";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const options = {
    edit: false,
    color: "gray",
    activeColor: "blue",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 15 : 20,
  };

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <div className="product-details">
        <div>
          {product && product.images && (
            <img
              className="product-details-image"
              src={product.images[0].url}
              alt="Product"
            />
          )}
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span>({product.numOfReviews} reviews)</span>
          </div>
          <div className="detailsBlock-3">
            <p>{`₹${product.price}`}</p>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button>-</button>
                <input type="number" value="1" />
                <button>+</button>
              </div>
              <button>Add to cart</button>
            </div>
            <p>
              Status:
              <b className={product.stock < 1 ? "text-red" : "text-green"}>
                {product.stock < 1 ? "Out of Stock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description: <p>{product.description}</p>
          </div>

          <button className="submit-review">Submit Review</button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
