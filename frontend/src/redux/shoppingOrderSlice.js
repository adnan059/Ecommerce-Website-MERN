import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  approvalURL: null,
  orderId: null,
  sh_OrderList: [],
  sh_orderDetails: null,
};

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    setShoppingOrderDetails: (state, action) => {
      state.sh_orderDetails = action.payload.data;
    },
    setShoppingOrderList: (state, action) => {
      state.sh_OrderList = action.payload.data;
    },
    handleNewOrder: (state, action) => {
      state.approvalURL = action.payload.approvalURL;
      state.orderId = action.payload.orderId;
      sessionStorage.setItem(
        "currentOrderId",
        JSON.stringify(action.payload.orderId)
      );
    },
  },
});

export const { setShoppingOrderDetails, setShoppingOrderList, handleNewOrder } =
  shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
