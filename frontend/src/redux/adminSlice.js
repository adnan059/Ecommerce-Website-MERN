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
    setOrderList: (state, action) => {
      state.orderList = action.payload.data;
    },
    setOrderDetails: (state, action) => {
      state.orderDetails = action.payload.data;
    },
  },
});

export const { setProductList, setOrderList, setOrderDetails } =
  adminSlice.actions;

export default adminSlice.reducer;
