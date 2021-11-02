import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
const primaryColor = "#eb4034";

const options = {
  burgerColorHover: primaryColor,
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: primaryColor,
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  profileIconUrl: "/login",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35, 0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: primaryColor,
  link1Margin: "1vmax",
  searchIconColor: "rgba(35, 35, 35, 0.8)",
  cartIconColor: "rgba(35, 35, 35, 0.8)",
  profileIconColor: "rgba(35, 35, 35, 0.8)",
  searchIconColorHover: primaryColor,
  cartIconColorHover: primaryColor,
  profileIconColorHover: primaryColor,
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
