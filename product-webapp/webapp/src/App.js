import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bs-stepper/dist/css/bs-stepper.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import AddCars from "./components/AddCars";
import { CarDetails } from "./pages/CarDetails";
import CarList from "./components/CarList";
import { Provider } from "react-redux";
import { store } from "./store";
import BookingInfo from "./components/BookingInfo";
import AddAddress from "./components/AddAddress";
import SignIn from "./components/Signin";
import SignUp from "./components/SignUp";
import TwoFactorAuth from "./components/TwoFactorAuth";
import ForgotPassword from "./components/ForgotPassword";
import MyProfile from "./components/MyProfile";
import VendorDashboardPage from "./pages/VendorDashboard";
import VendorCarBookings from "./pages/VendorCarBookings";
import UserCarBookings from "./pages/UserCarBookings";
import { Header } from "./components/Header";
import Index from "./components";
import MyChat from "./components/Chat";

function App() {
  document.body.style.backgroundColor = "#F1F3F6";
  return (
    <Provider store={store}>
      <div>
        <HashRouter>
          <Header />
          <Routes>
            <Route exact path="/bookinginfo" element={<BookingInfo />} />
            <Route
              exact
              path="/cardetails/:vehicleId"
              element={<CarDetails />}
            />
            <Route exact path="/AddCars" element={<AddCars />} />
            <Route exact path="/List" element={<CarList />} />
            <Route
              exact
              path="/Vendordashboard"
              element={<VendorDashboardPage />}
            />
            <Route
              exact
              path="/Vendorcarbookings/:vehicleNo"
              element={<VendorCarBookings />}
            />
            <Route
              exact
              path="/usercarbookings"
              element={<UserCarBookings />}
            />
            <Route exact path="/" element={<Index />} />
            <Route exact path="/AddAddress" element={<AddAddress />} />
            <Route exact path="/Signin" element={<SignIn />} />
            <Route exact path="/SignUp" element={<SignUp />} />
            <Route exact path="/otpAuth" element={<TwoFactorAuth />} />
            <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
            <Route exact path="/profile" element={<MyProfile />} />
            <Route exect path="/Mychat" element={<MyChat />} />
          </Routes>
        </HashRouter>
      </div>
    </Provider>
  );
}

export default App;
