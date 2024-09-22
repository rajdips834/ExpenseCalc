import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  incomes: [],
  totalIncome: 0,
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
    editIncome: (state, action) => {
      const index = state.incomes.findIndex(
        (income) => income.id === action.payload.id
      );
      state.incomes[index] = action.payload;
    },
    fetchUserIncomes: (state, action) => {
      state.incomes = action.payload;
    },
    setTotalIncome: (state) => {
      state.totalIncome = state.incomes.reduce(
        (sum, item) => sum + parseFloat(item.amount),
        0
      );
    },
  },
});
export const {
  addIncomes,
  deleteIncome,
  editIncome,
  fetchUserIncomes,
  setTotalIncome,
} = incomesSlice.actions;
export default incomesSlice.reducer;
