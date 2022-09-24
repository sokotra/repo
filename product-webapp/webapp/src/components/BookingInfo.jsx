import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdSecurity } from 'react-icons/md';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Payment } from "../services/CheckoutAPI";
import { AddBooking } from "../services/AddCarsAPI";
import PreLoader from "../preloader";
import useRazorpay from "react-razorpay";
import { EmailService } from '../services/AuthenticationAPI';
import Tostify from "./Tostify";

export default function BookingInfo() {
  const Razorpay = useRazorpay();
  const { selectedVehicle, selectedDate, selectedProfile } = useSelector((state) => state);
  const { image, brandName, modelName, location, fare, vehicleNo } = selectedVehicle;
  const [showCheckout, setShowCheckout] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoader, setLoader] = useState(false);
  const [sentEmailSuccess, setEmailSuccess] = useState(false)
  const { from, to } = selectedDate;
  const noOfDays =
    (new Date(to).getTime() - new Date(from).getTime()) / (1000 * 3600 * 24);
  var totalFare = parseInt(fare) * noOfDays;

  if (noOfDays > 1) {
    totalFare = totalFare * (1 - (0.05 * (noOfDays - 1)));
  }

  const leftArr = [
    "Air Conditioning",
    "Audio Input",
    "Tilt Steering",
    "Integrated Spoiler",
    "Central Door Locking",
  ];
  let rightArr = [
    "Wipers",
    "Headlamp Leveling",
    "Seat Belts",
    "Dual Airbags",
    "Glove Box",
  ];

  const MakePayment = () => {
    Payment(totalFare).then(response => {
      if (response.isSuccess) {

        var options = {
          key: "rzp_test_83ogGOdlkFyTUL",
          amount: response.data.amount * 100,
          currency: "INR",
          name: "caRentz",
          image: image,
          description: brandName + " " + modelName,
          handler: function (res) {
            var bookingDetails = {
              bookingId: response.data.receipt,
              clientEmailId: selectedProfile.emailId,
              vehicleNo: vehicleNo,
              fromDatetime: from,
              toDatetime: to
            }
            AddBookingDetails(bookingDetails);
          },
          prefill: {
            name: "Prakash",
            email: "prakashcse71298@gmail.com",
            contact: "8248715711"
          },
          notes: {
            address: "Razorpay Corporate office"
          },
          theme: {
            color: "#3175eb"
          }
        };
        var pay = new Razorpay(options);
        pay.open();
      }
    })

  }

  const AddBookingDetails = (data) => {
    AddBooking(data).then(response => {
      if (response.isSuccess) {
        EmailService(response.data).then(res => {
          if (res.isSuccess) {
            console.log("responseeee", res.data)
            setEmailSuccess(true);
            setTimeout(function () {
              setEmailSuccess(false)
            }, 2000);
          }
          else {
            alert("error....")
          }
        })
        setLoader(true);
        setTimeout(function () {
          setLoader(false);
          setShowCheckout(false);
          setShowSuccess(true);
        }, 2000);

      }
    })

  }

  const getPriceSummary = () => (
    <div className="price-summary">
      <h2>Price Summary</h2>
      <div>
        <p>Fare Per Day :</p>
        <p>{fare} /-</p>
      </div>
      <div>
        <p>
          <FaCalendarAlt />
          {`${from} to ${to} :`}
        </p>
        <p>{noOfDays} days</p>
      </div>
      <div className="total-fare">
        <p>Total Fare :</p>
        <p>{totalFare}/-</p>
      </div>
      <div className="d-grid gap-2 mb-2 d-md-flex mt-3 justify-content-md-center btn-gps">
        <button className="btn btn-success btn-lg" onClick={MakePayment}>Proceed to pay  <MdSecurity size={20} />  </button>
      </div>
    </div>
  );

  return (

    <>
      {sentEmailSuccess &&
        <Tostify message="Email sent successfully" type="success" />
      }
      {showCheckout && <>
        <div className="gradient"></div>
        <div className="bookinginfo-body">
          <h1>Booking Summary</h1>
          <div className="row">
            <div className="col bookinginfo-left">
              <div>
                <img src={image} alt="" />
              </div>
              <div>
                {brandName} {modelName}
              </div>

              <FaMapMarkerAlt />
              {location}
            </div>

            <div className="col bookinginfo-right">
              <ul>
                {leftArr.map((item) => (
                  <li key={item}>
                    <FaCheck />
                    {item}
                  </li>
                ))}
              </ul>
              <ul>
                {rightArr.map((item) => (
                  <li key={item}>
                    <FaCheck />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {getPriceSummary()}
        </div>
      </>}


      {showSuccess && paymentConfirm()}

      {showLoader && <PreLoader />}
    </>
  );

  function paymentConfirm() {
    return (
      <>
        <div className="container mt-5">
          <div className="row py-lg-5 ">
            <div className="col-lg-6 col-md-8 mx-auto mt-5">
              <div className="card ">
                <div className="card-body justify-content-center text-center">
                  <span className="fs-3 fw-bolder text-success">Your payment was successful!</span>
                  <div className="fs-3 fw-bolder text-success"><IoMdCheckmarkCircleOutline size={100} /></div>
                  <div className="d-grid gap-2 mb-2  d-md-flex mt-3 justify-content-md-center btn-gps">
                    <Link to="/usercarbookings" className="btn btn-warning" >View Booking </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
