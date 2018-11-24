import React, { Fragment } from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ContentContainer from "./containers/contentContainer";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Route
          path="/porcupine/:username?/:repository?/:branchOrCommit?"
          component={ContentContainer}
        />
      </Fragment>
    );
  }
}

export default hot(module)(() => <App classname="app" />);
