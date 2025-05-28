import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // Important for internal routing
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer-container">
        <div className="footer-services">
          <h3 className="footer-heading">Our Services</h3>
          <ul className="footer-list">
            <li>
              <Link to="/services">Solar Lead Generation</Link>
            </li>
            <li>
              <Link to="/services">Solar Appointments</Link>
            </li>
            <li>
              <Link to="/services">Appointments RepairNest</Link>
            </li>
            <li>
              <Link to="/services">Cold Calling</Link>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h3 className="footer-heading">Follow or Contact Us</h3>
          <div className="footer-icons">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </div>
          <p className="inner-content">
            A better future is possible. Contact us to learn more about our
            mission and work, and to get involved.
          </p>
          <div className="cont-numbers">
            <p>
              <FaWhatsapp /> WhatsApp Me
            </p>
            <div className="cont-line"></div>
            <p>+92 3097231563</p>
            <div className="cont-line"></div>
            <p>+92 3240311563</p>
            <div className="cont-line"></div>
          </div>
          <Link to="/contact" className="footer-contact-btn">
            Contact Us
          </Link>
        </div>
      </footer>

      <div className="footer-bottom">
        <p>©2024. Solar Village Project. All Rights Reserved.</p>
      </div>
    </>
  );
};

export default Footer;
