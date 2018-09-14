import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import configureStore from "./store/configureStore";
import Content from "./components/content";
import Faq from "./components/faq";
import Navbar from "./components/navbar";
import Slack from "./components/slack";
import Github from "./components/github";


const store = configureStore();

class App extends React.Component {

  render() {
    return (
      <Fragment>
        <Navbar />
        <Switch>
          <Route path="/faq"      component={Faq} />
          <Route path="/slack"    component={Slack} />
          <Route path="/github"   component={Github} />
          <Route path="/"         component={Content} />
        </Switch>
    </Fragment>
  )};
};

export default hot(module)(() => <App classname="app" />);
