import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartId: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload.data;
      state.cartId = action.payload.cartId;
    },
  },
});

export const { setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
