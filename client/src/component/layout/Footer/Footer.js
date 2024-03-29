import React from "react";
import { Link } from "react-router-dom";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS</p>
        <div>
          <img src={playStore} alt="playstore" />
          <img src={appStore} alt="appstore" />
        </div>
      </div>

      <div className="midFooter">
        <h1>SB Store</h1>
        <p>Copyrights 2021 &copy; ShyamButani</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <div className="follow-links">
          <Link to="#">Instagram</Link>
          <Link to="#">Facebook</Link>
          <Link to="#">Youtube</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
