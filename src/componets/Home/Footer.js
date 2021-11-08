import React from "react";
import "./Footer.css"
const Footer = () => {
  return (
    <div class="px-3 pt-3 mt-3 row m-0 footer border-top">
      <div class="col-6 p-0 text-left">
        <a href="https://bloomia.app/terms-and-conditions">
          Terms and Conditions
        </a>
        <a href="https://bloomia.app/privacy">Privacy</a>
        <a href="https://bloomia.app/refund-and-cancellations">
          Refund and Cancellations
        </a>
      </div>
      <div class="col-6 p-0 text-center">
        <a href="https://bloomia.app/disclamer">Disclamer</a>
        <a href="https://bloomia.app/contact-us">Contact Us</a>
      </div>
    </div>
  );
};

export default Footer;
