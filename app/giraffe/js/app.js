import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Faq from "./components/faq";
import LandingPage from "./components/landingPage";
import Slack from "./components/slack";
import Container from "./containers/container";
import Github from "./components/github";
import Gallery from "./components/gallery";
import SmallScreenAlert from "./components/smallScreenAlert";
import UnhappyBrowser from "./components/unhappyBrowser";

class App extends React.Component {
  render() {
    return (
      <Container>
        <UnhappyBrowser />
        <SmallScreenAlert />
        <Switch>
          <Route path="/faq" component={Faq} />
          <Route path="/slack" component={Slack} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/github" component={Github} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Container>
    );
  }
}

export default hot(module)(() => <App classname="app" />);
