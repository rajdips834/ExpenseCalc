import { combineReducers } from "@reduxjs/toolkit";
import amountReducer from "./amountReducer";
import authReducer from "./authReducer";
import expensesReducer from "./expensesReducer";
const reducers = combineReducers({
  amount: amountReducer,
  auth: authReducer,
  expensesReducer: expensesReducer,
});
export default reducers;
