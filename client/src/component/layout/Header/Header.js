import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";

const Header = () => {
  const primaryColor = "#eb4034";
  return (
    <ReactNavbar
      burgerColorHover={primaryColor}
      logo={logo}
      logoWidth="20vmax"
      navColor1="rgba(0,0,0,0.4)"
      logoHoverSize="10px"
      logoHoverColor={primaryColor}
      link1Text="Home"
      link2Text="Product"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/product"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.3vmax"
      link1Color="rgba(35, 35, 35, 0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover={primaryColor}
      link1Margin="1vmax"
      searchIconColor="rgba(35, 35, 35, 0.8)"
      cartIconColor="rgba(35, 35, 35, 0.8)"
      profileIconColor="rgba(35, 35, 35, 0.8)"
      searchIconColorHover={primaryColor}
      cartIconColorHover={primaryColor}
      profileIconColorHover={primaryColor}
      cartIconMargin="1vmax"
    />
  );
};

export default Header;
