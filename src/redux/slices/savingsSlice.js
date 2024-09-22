import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  savingGoals: 0,
};

export const savingsSlice = createSlice({
  name: "savings",
  initialState,
  reducers: {
    setSavingGoals: (state, action) => {
      state.savingGoals = action.payload;
    },
  },
});
export const { setSavingGoals } = savingsSlice.actions;
export default savingsSlice.reducer;
