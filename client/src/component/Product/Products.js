import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../../component/layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";
import "./products.css";

const categories = [
  "All",
  "Laptop",
  "Camera",
  "SmartPhones",
  "Attire",
  "Tops",
  "Bottom",
  "Footwear",
];

const Products = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [currenPrice, setCurrentPrice] = useState([0, 25000]);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const { loading, error, products, resultPerPage, filteredProductCount } =
    useSelector((state) => state.products);

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
    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, error, alert, keyword, currentPage, price, category]);

  return (
    <>
      {loading && products ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products" />
          <h2 className="products-heading">PRODUCTS</h2>

          <div className="products">
            {products && filteredProductCount <= 0 ? (
              <div className="no-products">No Product Found</div>
            ) : (
              products &&
              products.map((product) => <ProductCard product={product} />)
            )}
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

            <Typography>Categories</Typography>
            <ul className="category-box">
              {categories.map((category) => (
                <li
                  className="category-item"
                  key={category}
                  onClick={() => {
                    setCategory(category === "All" ? "" : category);
                    setCurrentPage(1);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
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
