import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  expenses: [],
  totalExpenses: 0,
};
export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
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
    setTotalExpense: (state) => {
      state.totalExpenses = state.expenses.reduce(
        (sum, item) => sum + parseFloat(item.amount),
        0
      );
    },
  },
});
export const {
  addExpense,
  deleteExpense,
  editExpense,
  fetchUserExpenses,
  setTotalExpense,
} = expensesSlice.actions;
export default expensesSlice.reducer;
