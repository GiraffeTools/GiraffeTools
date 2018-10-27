import React, { Fragment } from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import configureStore from "./store/configureStore";
import ContentContainer from "./containers/contentContainer";

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Route
          path="/porcupine/:username?/:repository?/:branch?"
          component={ContentContainer}
        />
      </Fragment>
    );
  }
}

export default hot(module)(() => <App classname="app" />);
