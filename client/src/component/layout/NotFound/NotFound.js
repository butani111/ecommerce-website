import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="page-not-found">
      <ErrorIcon />
      <Typography>Page Not Found</Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
