import React, { useEffect, useState } from "react";
import "./loginSignup.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, success, error } = useSelector(
    (state) => state.forgotPassword
  );

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if (success) {
      alert.success("Password reset Successfully");
      history.push("/login");
    }
  }, [dispatch, error, alert, history, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Reset Password" />
          <div className="login-signup-container">
            <div className="login-signup-box">
              <h2 className="change-password-heading">Reset Password</h2>
              <form className="login-form" onSubmit={resetPasswordSubmit}>
                <div className="login-password">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="login-password">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <input type="submit" value="Submit" className="signup-btn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
