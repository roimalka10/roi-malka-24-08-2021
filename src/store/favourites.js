import { createSlice } from "@reduxjs/toolkit";

const initialStateFav = [];

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: initialStateFav,
  reducers: {
    create: {
      reducer: (state, { payload }) => {
        state.push(payload);
      },
    },
    remove: (state, { payload }) => {
      const index = state.findIndex((fav) => fav.Key === payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { create, remove } = favouritesSlice.actions;

export default favouritesSlice.reducer;
