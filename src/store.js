import { configureStore } from "@reduxjs/toolkit";
import favouritesSlice from "../src/store/favourites";

export const store = configureStore({
  reducer: {
    favourites: favouritesSlice,
  },
});
