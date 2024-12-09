import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  orderList: [],
  orderDetails: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload.data;
    },
  },
});

export const { setProductList } = adminSlice.actions;

export default adminSlice.reducer;
