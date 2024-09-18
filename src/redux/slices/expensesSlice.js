import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  expenses: [
    {
      id: nanoid(),
      title: "Groceries",
      amount: 200,
      date: "2021-09-01",
    },
    {
      id: nanoid(),
      title: "Rent",
      amount: 1000,
      date: "2021-09-01",
    },
    {
      id: nanoid(),
      title: "Insurance",
      amount: 300,
      date: "2021-09-01",
    },
  ],
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
  },
});
export const { addExpense, deleteExpense, editExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
