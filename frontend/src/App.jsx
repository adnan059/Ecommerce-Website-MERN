import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import Ecom from "./Ecom";

import { persistor, store } from "./redux/store";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Ecom />
          <Toaster />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
