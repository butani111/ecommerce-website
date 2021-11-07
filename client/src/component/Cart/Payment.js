import React, { useRef } from "react";
import axios from "axios";
import "./payment.css";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const paymentData = {
    //amount should be in 'paisa', so multiply 'Rupee' with 100
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          history.push("/success");
        } else {
          alert.error("Something went wrong while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="payment-container">
        <form className="payment-form" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="payment-input" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="payment-input" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="payment-input" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="payment-btn"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
