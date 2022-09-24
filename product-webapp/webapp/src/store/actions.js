import {
  SET_APP_NAME,
  SET_VEHICLE_SELECTED,
  SET_DATE_SELECTED,
  SET_AUTH_TOKEN,
  FETCH_USERS_SUCCEEDED,
  SET_USER_TYPE
} from "./constants";
import axios from "axios";
//const baseUrl = 'http://localhost:8080/user-service';
const baseUrl = 'https://carentz.stackroute.io/user-service';



export const setAppName = (payload) => {
  return { type: SET_APP_NAME, payload };
};

export const setSelectedVehicle = (payload) => {
  return { type: SET_VEHICLE_SELECTED, payload };
};

export const setDateSelected = (payload) => {
  return { type: SET_DATE_SELECTED, payload };
};

export const setAuthToken = (payload) => {
  localStorage.setItem("MyToken", payload)
  return { type: SET_AUTH_TOKEN, payload };
}

export const setUserType = (payload) => {
  localStorage.setItem("MyType", payload)
  return { type: SET_USER_TYPE, payload };
}

export const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users
  }
}

export const fetchUsers = (id) => {
  const type = localStorage.getItem("MyType");
  return function (dispatch) {
    axios
      .get(`${baseUrl}/api/v1/${type}/${id}`)
      .then(response => {
        const users = response.data;
        localStorage.setItem("MyProfile", JSON.stringify(users))
        dispatch(fetchUsersSuccess(users))
      })
      .catch(err => {
        alert(err.message)
      })
      
  }
}