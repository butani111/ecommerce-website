import React, { useState } from "react";
import "./header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Backdrop from "@material-ui/core/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router";
import { logout } from "../../../actions/userAction";

const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const dashboard = () => history.push("/dashboard");
  const orders = () => history.push("/orders");
  const account = () => history.push("/account");
  const cart = () => history.push("/cart");
  const logoutUser = () => {
    dispatch(logout());
    alert.success("Logout Successfully");
    history.push("/");
  };

  const options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        className="speed-dial"
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="speed-dial-icon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 800 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
