import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = !state.loading;
    },
  },
});
export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
