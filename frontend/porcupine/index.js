import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import store from "./store";
import App from "./app";

render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById("porcupine")
);
