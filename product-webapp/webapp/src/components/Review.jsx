import React from "react";
import "../styles/invoice.css";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { getServerUrl } from "../utils/utility";
import { updateRating } from "../services/CarBookingAPI";
import Tostify from "./Tostify";

const colors = {
  orange: "#ffa534",
  grey: "#a9a9a9",
};

const Review = ({ show, onClose, vehicleNo, clientEmailId }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const ref = useRef(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const stars = Array(5).fill(0);

  useEffect(() => {
    setCurrentValue(0);
  }, [show]);

  if (!show) {
    return null;
  }
  const handleClick = (value) => {
    setCurrentValue(value);
  };
  const handleMouseOver = (value) => {
    setHoverValue(value);
  };
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  function HandleOnSubmit() {
    setUpdateSuccess(true);

    setTimeout(function () {
      setUpdateSuccess(false);
      onClose();
    }, 1500);

    if (currentValue) {
      const response = updateRating(
        `${getServerUrl()}/addrating/${vehicleNo}&${currentValue}`,
        {}
      );
      if (response.status !== "error") {
        console.log("Success");
      }
    }
    if (ref.current.value) {
      const reviewResponse = updateRating(
        `${getServerUrl()}/addreview?vehicleNo=${vehicleNo}`,
        {
          clientEmailId,
          comment: ref.current.value,
        }
      );
      if (reviewResponse.status !== "error") {
        console.log("Success");
      }
    }
  }

  return (
    <div className="popup-box-review">
      <div className="box-review">
        <button onClick={onClose} className="close-button">
          x
        </button>

        <div className="review-body">
          <div className="review-heading">
            <h3>Your Opinion Matters us </h3>
          </div>
          <div className="review-mast">
            <div className="review-content">
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    color={
                      (hoverValue || currentValue) > index
                        ? colors.orange
                        : colors.grey
                    }
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })}
            </div>
            <textarea ref={ref} placeholder="Hows your ride?" />

            <button onClick={HandleOnSubmit} className="button btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
      {updateSuccess && (
        <Tostify message="Update Successfully" type="success" />
      )}
    </div>
  );
};
export default Review;
