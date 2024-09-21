import { createSlice, nanoid } from "@reduxjs/toolkit";
import { fetchExpenses } from "../../utils/fetchSessionData";
const initialState = {
  incomes: [],
};
export const incomesSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    addIncomes: (state, action) => {
      state.incomes.push(action.payload);
    },
    deleteIncome: (state, action) => {
      state.incomes = state.incomes.filter(
        (income) => income.id !== action.payload
      );
    },
    editExpense: (state, action) => {
      const index = state.incomes.findIndex(
        (income) => income.id === action.payload.id
      );
      state.incomes[index] = action.payload;
    },
    fetchUserIncomes: (state, action) => {
      state.incomes = action.payload;
    },
  },
});
export const { addIncomes, deleteIncome, editIncome, fetchUserIncomes } =
  incomesSlice.actions;
export default incomesSlice.reducer;
