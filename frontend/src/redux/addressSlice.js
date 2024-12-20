import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressList: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddressList: (state, action) => {
      state.addressList = action.payload.data;
    },
  },
});

export const { setAddressList } = addressSlice.actions;
export default addressSlice.reducer;
