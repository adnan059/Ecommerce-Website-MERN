import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "./authSlice.js";
import commonSlice from "./commonSlice.js";
import adminSlice from "./adminSlice.js";
import shopSlice from "./shopSlice.js";
import cartSlice from "./cartSlice.js";
import addressSlice from "./addressSlice.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducers = combineReducers({
  auth: authSlice,
  common: commonSlice,
  admin: adminSlice,
  shop: shopSlice,
  cart: cartSlice,
  address: addressSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
