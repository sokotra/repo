import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaRegEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/footer.css";

export  default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <footer>
        <div className="footer_info">
          <div className="footer_width about">
            <h2>About Us</h2>
            <p>
              caRentz is a company that rents automobiles for short periods of
              time to the public, generally ranging from a few hours to a few
              weeks. It is often organized with numerous local branches (which
              allow a user to return a vehicle to a different location), and
              primarily located near airports or busy city areas and often
              complemented by a website allowing online reservations.
            </p>
            <div className="social_media">
              <ul>
                <li>
                  <FaFacebook />
                </li>
                <li>
                  <FaYoutube />
                </li>
                <li>
                  <FaTwitter />
                </li>
                <li>
                  <FaInstagram />
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_width links">
            <h2>Quick links</h2>
            <ul>
              <li onClick={() => navigate("")}>Home</li>
              <li onClick={() => navigate("/signin")}>Sign In</li>
              <li onClick={() => navigate("/signup")}>Sign Up</li>
            </ul>
          </div>
          <div className="footer_width contact">
            <h2>Contact Us</h2>
            <ul>
              <li>
                <FaMapMarkerAlt />
                <a
                  href="https://maps.app.goo.gl/Pfe7jJKFxKeZ89GT6"
                  target="blank"
                >
                  Bangalore,India
                </a>
              </li>
              <li>
                <FaPhoneAlt />
                <a href="tel:+91 99492xxx5647">+91 9949295647</a>
              </li>
              <li>
                <FaRegEnvelope />
                <a href="mailto:  carentz70@gmail.com"> carentz70@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copy-right">
          <p>@ COPYRIGHT 2022 ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </>
  );
}
