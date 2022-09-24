/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";;
import { useNavigate, useParams } from "react-router-dom";
import { CarDescription } from "../components/CarDescription";
import CarMastHead from "../components/CarMastHead";
import PageNotFound from "../components/PageNotFound";
import {
  getVehicleRatings,
  getVehicleDetails,
} from "../services/CarDetailsAPI";

export const CarDetails = () => {
  document.body.style.backgroundColor = "white";
  const selectedProfile = localStorage.getItem('MyProfile') ? JSON.parse(localStorage.getItem('MyProfile')) : false;
  const type = localStorage.getItem('MyType') && localStorage.getItem('MyType') === 'client' ? true : false;

  const navigate = useNavigate();
  const { vehicleId } = useParams();
  const [carDetails, setCarDetails] = useState("");
  const [ratings, setRatings] = useState("");

  useEffect(() => {
    Promise.all([
      getVehicleDetails(vehicleId),
      getVehicleRatings(vehicleId),
    ]).then((values) => {
      if (values[0].status !== "error") setCarDetails(values[0]);
      if (values[1].status !== "error") setRatings(values[1]);
    });
  }, []);

  return (
    <>
    {selectedProfile && type ? 
    (selectedProfile.address &&
      <div className="car-details-section margin">
        {carDetails && <CarMastHead {...carDetails} />}
        { <CarDescription {...carDetails} {...ratings} />}
      </div>) || (navigate('/AddAddress', { state: { userInfo: selectedProfile, rePath: "/cardetails/" + vehicleId } }))
    : <PageNotFound />}
    </>
  );
};
