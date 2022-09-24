import React from "react";
import "../styles/vendor.scss";
import { FaArrowRight } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import Modal from "./InvoiceModal";
import { useState } from "react";
export default function VendorCarBookingDetails(props) {
  const {
    clientEmailId,
    vehicleNo,
    fromDatetime,
    toDatetime,
    totalFare,
    bookingId,
  } = props;
  const [show, setShow] = useState(false);
  const [review, setReview] = useState(false);

  const getUserIcon = (email) => {
    return email
      .substring(0, email.lastIndexOf("@"))
      .split(" ")
      .map((value) => value.charAt(0))
      .toString()
      .toUpperCase();
  };
  const getUserName = (name) => {
    return name.substring(0, name.lastIndexOf("@"));
  };

  const generateRandomColor = () => {
    let maxVal = 0xffffff;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  };
  return (
    <div className="vendorbookings-container">
      <span>
        {fromDatetime}
        <FaArrowRight />
        {toDatetime}{" "}
      </span>

      <div className="vendorbookings-content">
        <div className="vendorbooking-left">
          <p
            style={{ backgroundColor: generateRandomColor() }}
            title={getUserName(clientEmailId)}
          >
            {getUserIcon(clientEmailId)}
          </p>
          <div>
            {getUserName(clientEmailId)}
            <br />
            Vehicle No : {vehicleNo}
          </div>
        </div>
        <div className="vendorbooking-right">
          <div>
            <FaRupeeSign />
            {totalFare}
          </div>
          <div>
            <button className="btn btn-lg btn-primary" onClick={() => setShow(true)}>
              {" "}
              View Invoice
            </button>
            <Modal show={show} onClose={() => setShow(false)} {...props} />
          </div>
        </div>
      </div>
    </div>
  );
}
