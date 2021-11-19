import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "./CartItemCard";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import "./cart.css";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    if (stock > quantity) {
      dispatch(addItemsToCart(id, quantity + 1));
    }
  };
  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      dispatch(addItemsToCart(id, quantity - 1));
    }
  };

  const deleteCartItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <MetaData title="My Cart" />
          <div className="cart-page">
            <div className="cart-header">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item, i) => (
                <div className="cart-container" key={i}>
                  <CartItemCard item={item} deleteCartItem={deleteCartItem} />

                  <div className="cart-input">
                    <button
                      onClick={() => {
                        decreaseQuantity(item.product, item.quantity);
                      }}
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() => {
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-subtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cart-gross-total">
              <div></div>
              <div className="cart-gross-total-box">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (sum, item) => sum + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="cart-checkout-btn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
