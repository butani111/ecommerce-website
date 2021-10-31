import React, { useEffect } from "react";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

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
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  return (
    <>
      {!product || !product.name ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.name.toString()} />

          <div className="product-details">
            <div>
              {product.images && (
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

          <h4 className="product-reviews-heading">REVIEWS</h4>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="product-reviews">
              {product.reviews.map((review) => (
                <ReviewCard review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
