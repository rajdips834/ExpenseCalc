import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import loadingReducer from "./slices/loadingSlice";
import expenseReducer from "./slices/expensesSlice";
import incomeReducer from "./slices/incomesSlice";
import savingsSlice from "./slices/savingsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    loading: loadingReducer,
    incomes: incomeReducer,
    savings: savingsSlice,
  },
});
