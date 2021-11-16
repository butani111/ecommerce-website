import React, { useState } from "react";
import { useAlert } from "react-alert";
import "./contactPage.css";
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import MobileIcon from "@material-ui/icons/MobileFriendly";
import MessageIcon from "@material-ui/icons/MessageOutlined";

const ContactPage = () => {
  const alert = useAlert();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [message, setMessage] = useState("");

  const contactPageSubmitHandler = (e) => {
    e.preventDefault();
    // Send data to the server if required

    const success = true;
    if (success) {
      alert.success("Submitted Successfully. Welcome to our family.");
    }
  };

  return (
    <>
      <div className="contact-page-container">
        <form
          className="login-form contact-page-form"
          onSubmit={contactPageSubmitHandler}
        >
          <div>
            <FaceIcon />
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <MobileIcon />
            <input
              type="number"
              placeholder="Mobile Number"
              required
              name="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
          <div>
            <MessageIcon />
            <input
              type="text"
              placeholder="Message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <input type="submit" value="Submit" className="login-btn" />
        </form>
      </div>
    </>
  );
};

export default ContactPage;
