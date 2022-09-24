import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducer";
import thunk from 'redux-thunk'

const initialState = {
  appName: "CaRentz",
  selectedVehicle: {},
  selectedDate: {},
  selectedProfile: localStorage.getItem("MyProfile") ? JSON.parse(localStorage.getItem("MyProfile")) : {},
  getAuth: localStorage.getItem("MyToken") ? localStorage.getItem("MyToken") : "",
  setType: localStorage.getItem("MyType") ? localStorage.getItem("MyType") : ""
};
export const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
