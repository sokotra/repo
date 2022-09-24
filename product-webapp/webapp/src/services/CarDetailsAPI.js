import axios from "axios";

//const baseUrl = 'http://localhost:8080/bookings-management';

const baseUrl = 'https://carentz.stackroute.io/bookings-management';

export const error = { status: "error" };

export const getVehicleDetails = async (vehicleNo) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v4/getvehicledetails/${vehicleNo}`
    );
    if (response.status === 200 && response.data) {
      console.log("Insideeee")
      return response.data;}
    return error;
  } catch (err) {
    return error;
  }
};

export const getVehicleRatings = async (vehicleNo) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v4/getratingCount/${vehicleNo}`
    );
    if (response.status === 200 && response.data) {
    return response.data;
  }
    return error;
  } catch (err) {
    return error;
  }
};


