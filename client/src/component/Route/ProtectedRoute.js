import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const ProtectedRoute = ({ component: Component, isAdmin, ...rest }) => {
  const { user, loading, isAuthorizedUser } = useSelector(
    (state) => state.user
  );

  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthorizedUser === false) {
              return <Redirect to="/login" />;
            }
            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/login" />;
            }
            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
