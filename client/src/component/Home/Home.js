import React from "react";
import { CgMouse } from "react-icons/all";
import "./home.css";
import Product from "./Product";

// Temprary
const product = {
  name: "Mobile 99+",
  price: "$50000",
  _id: "asifhkfdk",
  images: [
    {
      url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.7bG72xhz1-vXEq5qvWWMkwHaE7%26pid%3DApi&f=1",
    },
  ],
};

const Home = () => {
  return (
    <>
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
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />

        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
