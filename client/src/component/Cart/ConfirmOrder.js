import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import "./confirmOrder.css";

const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharges + tax;

  const proceedToPayment = () => {
    const data = { subtotal, shippingCharges, tax, totalPrice };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirm-order-page">
        <div>
          <div className="confirm-shipping-area">
            <Typography>Shipping Info</Typography>
            <div className="confirm-shipping-area-box">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="confirm-cart-items">
            <Typography>Your Cart Items:</Typography>
            <div className="confirm-cart-items-container">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X {item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className="order-summary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="order-summay-total">
              <p>
                <b>Total</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Procced to Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
