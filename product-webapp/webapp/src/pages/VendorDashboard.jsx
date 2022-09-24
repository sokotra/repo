import React from "react";
import { useNavigate } from "react-router-dom";
import VendorDashboardView from "../components/VendorDashboardView";
import "../styles/vendor.scss";
import useFetch from "../components/UseFetch";

//const baseUrl = 'http://localhost:8080/bookings-management';
const baseUrl = 'https://carentz.stackroute.io/bookings-management';


export default function VendorDashboard() {
  const selectedProfile = localStorage.getItem("MyProfile")
    ? JSON.parse(localStorage.getItem("MyProfile"))
    : false;
  const navigate = useNavigate();
  const vendorEmailId = selectedProfile.emailId;
  const navigateAddCars = () => {
    navigate("/addcars");
  };
  const url = `${baseUrl}/api/v4/getvehicleByVendor/${vendorEmailId}`;
  const { data, isLoading, error } = useFetch(url);
  if (isLoading) {
    return <p>loading.....</p>;
  }
  if (error) {
    return <p>an error occured</p>;
  }
  if (data && data.length === 0) {
    navigate("/addcars");
  }

  return (
    <>
      <div className="vendordashboard-header">
        <h2>My Cars</h2>
        <button onClick={navigateAddCars} className="btn btn-success">
          Add Car
        </button>
      </div>
      {data.map((vehicle, index) => (
        <div key={index}>
          <VendorDashboardView {...vehicle} />
        </div>
      ))}
    </>
  );
}
