import React, { Fragment } from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Content from "./containers/content";
import UnhappyBrowser from "../giraffe/containers/unhappyBrowser";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <UnhappyBrowser />
        <Route
          path="/porcupine/:username?/:repository?/:branchOrCommit?"
          component={Content}
        />
      </Fragment>
    );
  }
}

export default hot(module)(() => <App classname="app" />);
