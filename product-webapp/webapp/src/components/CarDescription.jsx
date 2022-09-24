import fuelImage from "../assests/images/fuel.jpeg";
import gearImage from "../assests/images/gear.jpeg";
import mileageImage from "../assests/images/mileage.jpeg";
import purchase from "../assests/images/purchase.jpg";
import seatImg from "../assests/images/seat.jpeg";
import ratingImg from "../assests/images/rating.jpeg";
import carImg from "../assests/images/car2.jpeg";
import { BsChatLeftDotsFill } from 'react-icons/bs';
import { sentNewMessage } from '../services/ChatAPI';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PreLoader from "../preloader";
import { setSelectedVehicle } from "../store/actions";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";


export const CarDescription = (props) => {
  const {
    transmission,
    seats,
    vendorEmailId,
    category,
    fuel,
    average,
    yearOfpurchase,
    vehicleNo,
    available,

    description,
    avg,
    count,
    listReview,
  } = props;
  const selectedProfile = JSON.parse(localStorage.getItem("MyProfile")).emailId;
  const [showLoader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const viewChat = () => {

    var data = {
      fromId: selectedProfile,
      toId: vendorEmailId,
      messages: `Hello, I saw your car(${vehicleNo}) in caRentz, I'm interested to hire your car. Please let me know if its available. Thank you!.`
    }

    sentNewMessage(data).then(response => {
      if (response.isSuccess) {
        setLoader(true);
        setTimeout(function () {
          setLoader(false);
          navigate('/MyChat');
        }, 1000);
      }
      else {
        alert("Error...")
      }
    })


  }

  const getUserIcon = (email) => {
    return email
      ?.substring(0, email.lastIndexOf("@"))
      .split(" ")
      .map((value) => value.charAt(0))
      .toString()
      .toUpperCase();
  };
  const getUserName = (name) => {
    return name?.substring(0, name.lastIndexOf("@")).toUpperCase();
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
    <div className="row desc-row">
      <div className="col">
        <h3>Hosted BY</h3>

        <div className="vendor">
          <p
            style={{ backgroundColor: generateRandomColor() }}
            title={getUserName(vendorEmailId)}
          >
            {getUserIcon(vendorEmailId)}
          </p>

          <div className="vendor-name">{getUserName(vendorEmailId)}</div>
        </div>

        <h3>Description</h3>
        <p className="descr">{description}</p>

        <div className="row">
          <p className="left-row col-3">
            <img src={purchase} alt="car" />
            <span>{yearOfpurchase}</span>
            Purchased
          </p>
          <p className="left-row col-3">
            <img src={fuelImage} alt="fuel" />
            <span>{fuel}</span>
            Fuel
          </p>
          <p className="left-row col-3">
            <img src={gearImage} alt="" />
            <span>{transmission}</span>
            Transmission
          </p>
        </div>
        <div className="row">
          <p className="left-row col-3">
            <img src={carImg} alt="" />
            <span>{category}</span>
            Category
          </p>
          <p className="left-row col-3">
            <img src={mileageImage} alt="" />
            <span>{average}</span>
            Mileage
          </p>
          <p className="left-row col-3">
            <img src={seatImg} alt="" />
            <span> {seats}</span>
            Seats
          </p>
        </div>
      </div>

      <div className="col">
      <div className="d-grid gap-2 d-md-flex justify-content-md-center btn-gps">
        <button className="btn btn-primary btn-lg mt-3 mb-4 fs-2" onClick={viewChat}> <BsChatLeftDotsFill /> Chat Now </button>
      

<button

  type="button"
  className="btn btn-primary btn-lg mt-3 mb-4 fs-2"
  disabled={!available}
  onClick={() => {
    dispatch(setSelectedVehicle({ ...props }));
    navigate("/bookinginfo");
  }}
>
  Book Your Ride
</button>

        </div>

        <h3>Ratings & Reviews</h3>

        {count ?
          <div>
            <div className="rating-part">
              <span id="span1">{Math.round(avg * 10) / 10}</span>
              <span>
                <img src={ratingImg} width="40px" alt="star" className="star" />
              </span>
              <span id="span2">({count} Ratings)</span>
            </div>
            <div className="reviewflow">
              <h4 className="scrollbar">Reviews</h4>
              {listReview?.map((review, index) => (
                <div key={index} className="user-review">
                  <p
                    style={{ backgroundColor: generateRandomColor() }}
                    className="review-name"
                    title={getUserName(review.clientEmailId)}
                  >
                    {getUserIcon(review.clientEmailId)}
                  </p>
                  <div className="review">{review.comment}</div>
                </div>
              ))}
            </div>
          </div>
          : <div>No Rating found</div>}

      </div>
      {showLoader && <PreLoader />}
    </div>
  );
};
