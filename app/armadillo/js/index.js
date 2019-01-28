import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import store from "./store";
import App from "./app";

render(
  <Provider className="app" store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("armadillo")
);
