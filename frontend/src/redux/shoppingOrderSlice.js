import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  approvalURL: null,
  orderId: null,
  sh_orderDetails: null,
};

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    setShoppingOrderDetails: (state, action) => {
      state.sh_orderDetails = action.payload.data;
    },

    handleNewOrder: (state, action) => {
      state.approvalURL = action.payload.approvalURL;
      state.orderId = action.payload.orderId;
      sessionStorage.setItem(
        "currentOrderId",
        JSON.stringify(action.payload.orderId)
      );
    },

    resetShoppingOrder: (state) => {
      state.approvalURL = null;
      state.orderId = null;
      state.sh_orderDetails = null;
    },
  },
});

export const { setShoppingOrderDetails, handleNewOrder, resetShoppingOrder } =
  shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
