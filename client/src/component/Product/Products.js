import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../../component/layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";
import "./products.css";
import Pagination from "react-js-pagination";

const Products = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword));
  }, [dispatch, error, alert, keyword]);

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
          {/* 
          <div className="pagination-box">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productCount}
              onChange={setCurrentPageNo}
              nextPageText='Next'
              prevPageText="Prev"
              firstPageText='1st'
              lastPageText='Last'
              itemClass='page-item'
              linkClass='page-link'
              activeClass='page-item-active'
              activeLinkClass='page-link-active'
            />
          </div> */}
        </>
      )}
    </>
  );
};

export default Products;
