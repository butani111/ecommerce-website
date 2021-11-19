import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <CheckCircleIcon />

      <Typography>Your Order has been placed successfully</Typography>
      <Link to="/orders">View Order</Link>
    </div>
  );
};

export default OrderSuccess;
