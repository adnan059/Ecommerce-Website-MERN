import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    searchResults: [],
    featureImageList: [],
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload.data;
    },
    setFeatureImageList: (state, action) => {
      state.featureImageList = action.payload.data;
    },
  },
});

export const { setSearchResults, setFeatureImageList } = commonSlice.actions;

export default commonSlice.reducer;
