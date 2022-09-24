import {
  SET_APP_NAME,
  SET_VEHICLE_SELECTED,
  SET_DATE_SELECTED,
  SET_AUTH_TOKEN,
  FETCH_USERS_SUCCEEDED,
  SET_USER_TYPE
} from "./constants";

export const rootReducer = function (state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_APP_NAME:
      return { ...state, appName: payload };
    case SET_VEHICLE_SELECTED:
      return { ...state, selectedVehicle: payload };
    case SET_DATE_SELECTED:
      return { ...state, selectedDate: payload };
    case SET_AUTH_TOKEN:
      return {...state, getAuth: payload}
    case  SET_USER_TYPE :
      return{...state, setType: payload}
    case FETCH_USERS_SUCCEEDED:
      return { ...state, selectedProfile: action.payload};
    default:
      return state;
  }
};
