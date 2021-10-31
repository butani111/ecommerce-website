import React, { useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import Loader from "../../component/layout/Loader/Loader";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="SB Store" />

          <div className="banner">
            <p>Welcome to SB Store</p>
            <h2>Explore Amazing Products below</h2>

            <a href="#home-container">
              <button>
                Scroll <CgMouse></CgMouse>
              </button>
            </a>
          </div>

          <h2 className="home-heading">Featured Products</h2>

          <div className="home-container" id="home-container">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
