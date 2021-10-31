import React, { useState } from "react";
import "./search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <>
      <form className="search-box" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a product . . ."
          onChange={(e) => setKeyword(e.target.value)}
          autoFocus="true"
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
