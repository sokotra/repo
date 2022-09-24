import React from "react";
import "../styles/vendor.scss";
import { FaArrowRight } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import useFetch from "./UseFetch";
import "../styles/invoice.css";
import { useState } from "react";
import Modal from "./InvoiceModal";
import Review from "./Review";

//const baseUrl = 'http://localhost:8080/bookings-management';
const baseUrl = 'https://carentz.stackroute.io/bookings-management';



export default function UserCarBookingDetails(props) {
  const {
    vehicleNo,
    fromDatetime,
    toDatetime,
    totalFare,
    // eslint-disable-next-line no-unused-vars
    bookingId,
    clientEmailId,
  } = props;
  const [show, setShow] = useState(false);
  const [review, setReview] = useState(false);
  const url = `${baseUrl}/api/v4/getvehicledetails/${vehicleNo}`;
  const { data, isLoading, error } = useFetch(url);
  if (isLoading) {
    return <p>loading.....</p>;
  }
  if (error) {
    return <p>an error occured</p>;
  }
  // eslint-disable-next-line no-unused-vars
  const { image, brandName, modelName, fuel, location } = data;

  return (
    <>
      <div className="userbookings-container">
        <span>
          {fromDatetime}
          <FaArrowRight />
          {toDatetime}
        </span>

        <div className="userbookings-content">
          <div className="userbooking-left">
            <p>
              <img src={image} alt="" />
            </p>
            <div>
              <div className="vehicle-name">
                {brandName}
                {modelName}
              </div>
              <br />
              Vehicle No : {vehicleNo}
              <br />
              Fuel : {fuel}
            </div>
          </div>
          <div></div>
          <div className="userbooking-right">
            <div>
              <FaRupeeSign />
              {totalFare}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <button
                  className="btn btn-lg btn-primary mb-3"
                  onClick={() => setShow(true)}
                >
                  View Invoice
                </button>
                <Modal
                  show={show}
                  onClose={() => setShow(false)}
                  {...props}
                  {...data}
                />
              </div>

              <div className="review-bottom">
                <button
                  className="review-button fw-normal text-decoration-underline"
                  onClick={() => setReview(true)}
                >
                  Review your ride
                </button>
                <Review
                  show={review}
                  onClose={() => setReview(false)}
                  vehicleNo={vehicleNo}
                  clientEmailId={clientEmailId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
