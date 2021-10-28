import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import Product from "../Home/Product";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <div className="product-details">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => {
                <img
                  className="product-carousel-image"
                  key={item.url}
                  src={item.url}
                  alt={`${i} slide`}
                />;
              })}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
