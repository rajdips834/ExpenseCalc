import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import expenseReducer from "./slices/expensesSlice";
export const store = configureStore({
  reducer: { auth: authReducer, expenses: expenseReducer },
});
