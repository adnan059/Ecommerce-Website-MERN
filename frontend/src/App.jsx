import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import Ecom from "./Ecom";

import { persistor, store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Ecom />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
