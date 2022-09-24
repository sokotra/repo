/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PreLoader from "../preloader";

export default function Dropdown() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)

  const logout = () => {
    setLoader(true);
    setTimeout(function () {
        setLoader(false);
        localStorage.clear();
        navigate('/Signin')
    }, 2000);
  };

  const userRole = localStorage.getItem("MyType").toLowerCase();

  return (

    <>
    {loader && <PreLoader />}
    <div className="user-dropdown">
      <div className="user-dropdown-menu">
        {userRole === "client" ? (
          <ul>
            <li>
              <a onClick={() => navigate("/profile")}>Profile</a>
            </li>
            <li>
              <a onClick={() => navigate("/usercarbookings")}>Booking</a>
            </li>

            <li>
              <a onClick={() => navigate("/MyChat")}>Chat</a>
            </li>

            <li onClick={logout}>Logout</li>
          </ul>
        ) : (
          <ul>
            <li>
              <a onClick={() => navigate("/profile")}>Profile</a>
            </li>
            <li>
              <a onClick={() => navigate("/vendordashboard")}>Dashboard</a>
            </li>
            <li>
              <a onClick={() => navigate("/MyChat")}>Chat</a>
            </li>

            <li onClick={logout}>Logout</li>
          </ul>
        )}
      </div>
    </div>
    </>
  );

  
}
