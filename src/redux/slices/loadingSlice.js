import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    loading: (state, action) => {
      state.isLoading = !state.isLoading;
    },
  },
});
export const { loading } = loadingSlice.actions;
export default loadingSlice.reducer;
