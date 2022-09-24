import React from "react";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaGasPump, FaRupeeSign } from "react-icons/fa";

export default function CarMastHead(props) {
  const {
    noOftrips,
    image,
    brandName,
    modelName,
    available,
    location,
    fare,
  } = props;
 

  return (
    <>
      <div className="car-details">
        <img src={image} alt="car" />
        <div className="masthead">
          <h3>
            {brandName} {modelName}
            <br />
            <span>(Total Trips - {noOftrips})</span>
          </h3>
          <div className="additional-details">
            <FaMapMarkerAlt />
            {location}
            <br />
            <FaGasPump />
            unlimited kms without fuel
            <br />
            <FaRupeeSign />
            Fare @{fare}/day
          </div>
        
          
        </div>
      </div>
    </>
  );
}
