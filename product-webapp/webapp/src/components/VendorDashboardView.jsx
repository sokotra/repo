import React from "react";
import { useNavigate } from "react-router-dom";

export default function VendorDashboardView(props) {
  const {
    image,
    vehicleNo,
    brandName,
    modelName,
    fare,
    fuel,
    transmission,
    seats,
    average,
  } = props;

  const navigate = useNavigate();

  return (
    <>
      <div className="body-container">
        <div className="vendordashboard-container">
          <div>
            <p>{vehicleNo}</p>
            <img src={image} alt="" />
          </div>
          <div>
            <h2>
              {brandName} {modelName}
            </h2>
            <ul>
              <li>{fare}/day</li>
              <li>{fuel}</li>
              <li>{transmission}</li>
              <li>{seats} Seats</li>
              <li>{average} Kmpl</li>
            </ul>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/Vendorcarbookings/" + vehicleNo)}
            >
              View Booking Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
