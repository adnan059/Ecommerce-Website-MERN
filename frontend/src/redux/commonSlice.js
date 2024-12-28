import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    loading: false,
    searchResults: [],
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload.data;
    },
  },
});

export const { startLoading, endLoading, setSearchResults } =
  commonSlice.actions;

export default commonSlice.reducer;
