import { combineReducers } from "@reduxjs/toolkit";
import amountReducer from "./amountReducer";
import authReducer from "./authReducer";

const reducers = combineReducers({
  amount: amountReducer,
  auth: authReducer,
});
export default reducers;
