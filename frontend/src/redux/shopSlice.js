import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sh_productList: [],
  sh_productDetails: null,
};
const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setAllFilteredProducts: (state, action) => {
      state.sh_productList = action.payload.data;
    },
    setProductDetails: (state, action) => {
      state.sh_productDetails = action.payload.data;
    },
  },
});

export const { setAllFilteredProducts, setProductDetails } = shopSlice.actions;

export default shopSlice.reducer;
