import { createSlice, nanoid } from "@reduxjs/toolkit";
import { fetchExpenses } from "../../utils/fetchSessionData";
const initialState = {
  expenses: [],
};
export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      console.log(action.payload);
      state.expenses.push(action.payload);
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
    editExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      state.expenses[index] = action.payload;
    },
    fetchUserExpenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
});
export const { addExpense, deleteExpense, editExpense, fetchUserExpenses } =
  expensesSlice.actions;
export default expensesSlice.reducer;
