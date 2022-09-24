import "../styles/home.css";
import { FaMapMarkedAlt, FaCalendarAlt, FaCalendarCheck } from "react-icons/fa";

const HomeInfo = () => (
  <div className="content2">
    <div className="ride" id="ride">
      <div className="heading">
        <span>How it Works</span>
        <h1>Rent with 3 easy steps</h1>
      </div>
      <div className="ride-container">
        <div className="steps">
          <FaMapMarkedAlt />
          <h2>Choose a location</h2>
          <p>Enter your location to check the cars available nearby.</p>
        </div>
        <div className="steps">
          <FaCalendarAlt />
          <h2>Pick-Up Date</h2>
          <p>Choose your Start and End date to start your journey.</p>
        </div>
        <div className="steps">
          <FaCalendarCheck />
          <h2>Book A Car</h2>
          <p>
            Using CaRentz, you can book a ride close to you in just minutes.
          </p>
        </div>
      </div>
    </div>
  </div>
);
export default HomeInfo;
