/* eslint-disable jsx-a11y/anchor-is-valid */
import { IoCarSportOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import Dropdown from "../components/Dropdown";
import { useState } from "react";

export const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const loggedIn = !!localStorage.getItem("MyToken");
  let profile = {};
  if (loggedIn) {
    profile = localStorage.getItem("MyProfile")
      ? JSON.parse(localStorage.getItem("MyProfile"))
      : false;
  }

  return (
    <div className={`${!loggedIn ? "column-header" : ""} header`}>
      <div className="logo" style={{cursor:"pointer"}} onClick={() => navigate("")}>
        C<IoCarSportOutline />
        Rentz
      </div>
      <nav className="navbar">
        <ul>
          {loggedIn ? (
            <>
              <li
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Avatar name={profile.name} size="40" className="avatar-img" />
                {showDropdown && <Dropdown />}
              </li>
            </>
          ) : (
            <>
              <li>
                <a onClick={() => navigate("/signin")}>Log In</a>
              </li>
              <li>
                <a onClick={() => navigate("/signup")}>Sign Up</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
