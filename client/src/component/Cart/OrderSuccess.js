import React from "react";
import "./orderSuccess.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

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
