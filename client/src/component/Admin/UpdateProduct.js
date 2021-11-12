import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import "./newProduct.css";
import Sidebar from "./Sidebar";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";

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

const UpdateProduct = ({ history, match }) => {
  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const alert = useAlert();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const productId = match.params.id;

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    history,
    error,
    updateError,
    alert,
    isUpdated,
    productId,
    product,
  ]);

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="new-product-container">
          <form
            className="new-product-form"
            encType="multimedia/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Create Product</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                cols="10"
                rows="1"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div id="new-product-form-file">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={updateProductImagesChange}
              />
            </div>
            <div id="new-product-form-image">
              {oldImages &&
                oldImages.map((image, i) => (
                  <img key={i} src={image.url} alt="Old Product Preview" />
                ))}
            </div>
            <div id="new-product-form-image">
              {imagesPreview.map((image, i) => (
                <img key={i} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="new-product-btn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
