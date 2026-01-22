import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    loading(state) {
      state.isLoading = true;
      state.error = "";
    },
    cityLoaded(state, action) {
      state.city = action.payload;
      state.isLoading = false;
    },
    currentCityLoaded(state, action) {
      state.currentCity = action.payload;
      state.isLoading = false;
    },
    cityCreated(state, action) {
      state.city.push(action.payload);
      state.currentCity = action.payload;
      state.isLoading = false;
    },
    cityDeleted(state, action) {
      state.city = state.city.filter((c) => c.id !== action.payload);
      state.currentCity = {};
      state.isLoading = false;
    },
    rejected(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  loading,
  cityLoaded,
  currentCityLoaded,
  cityCreated,
  cityDeleted,
  rejected,
} = citySlice.actions;

export default citySlice.reducer;
