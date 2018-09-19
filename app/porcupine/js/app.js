import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import configureStore from "./store/configureStore";
import ContentContainer from "./containers/contentContainer";
import LoadDataContainer from "./containers/loadingContainer";

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Route path="/porcupine" component={ContentContainer} />
        <Route
          path="/porcupine/:username/:repository"
          component={LoadDataContainer}
        />
      </Fragment>
    );
  }
}

export default hot(module)(() => <App classname="app" />);
