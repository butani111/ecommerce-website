import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../../component/layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";
import "./products.css";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const Products = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [currenPrice, setCurrentPrice] = useState([0, 25000]);
  const [price, setPrice] = useState([0, 25000]);

  const {
    loading,
    error,
    products,
    productCount,
    resultPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const currentPriceHandler = (e, newPrice) => {
    setCurrentPrice(newPrice);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price));
  }, [dispatch, error, alert, keyword, currentPage, price]);

  return (
    <>
      {loading && products ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products" />
          <h2 className="products-heading">PRODUCTS</h2>

          <div className="products">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>

          <div className="filter-box">
            <Typography>Price Range</Typography>
            <Slider
              value={currenPrice}
              onChange={currentPriceHandler}
              onChangeCommitted={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
              step={5}
            />
          </div>

          {resultPerPage <= filteredProductCount && (
            <div className="pagination-box">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={filteredProductCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="page-item-active"
                activeLinkClass="page-link-active"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
