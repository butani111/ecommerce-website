import React from "react";
import MetaData from "../layout/MetaData";

import "./aboutUs.css";

const AboutUs = () => {
  return (
    <>
      <MetaData title="About Us - SB Store" />
      <div className="about-us-container">
        <div className="about-us-header">
          <h1>About Us</h1>
          <h2>SB Store</h2>
        </div>
        <div className="about-us-details">
          <p>
            Welcome to SB Store, your number one source for all things Laptops,
            clothes, shoes, bags, etc. We're dedicated to giving you the very
            best of all products, with a focus on dependability, customer
            service and uniqueness.
          </p>
          <p>
            Founded in 2020 by Shyam Butani, SB Store has come a long way from
            its beginnings in a home office. When Shyam Butani first started
            out, his/her passion for helping other people be more eco-friendly
            drove him to do intense research and gave him the impetus to turn
            hard work and inspiration into to a booming online store. We now
            serve customers all over the world and are thrilled to be a part of
            the eco-friendly wing of the online shopping industry.
          </p>
          <p>
            We hope you enjoy our products as much as we enjoy offering them to
            you. If you have any questions or comments, please don't hesitate to
            contact us.
          </p>
          <p>
            Sincerely, <br /> Shyam Butani, Founder.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
