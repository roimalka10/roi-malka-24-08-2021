import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true,
};

export const isMetricSlice = createSlice({
  name: "isMetric",
  initialState,
  reducers: {
    change: (state) => {
      state.value = !state.value;
    },
  },
});

export const { change } = isMetricSlice.actions;

export default isMetricSlice.reducer;
