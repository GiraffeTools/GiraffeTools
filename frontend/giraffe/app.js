import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Faq from "./pages/faq";
import LandingPage from "./pages/landingPage";
import Slack from "./pages/slack";
import AppContainer from "./containers/container";
import Github from "./pages/github";
import Gallery from "./pages/gallery";
import SmallScreenAlert from "./containers/smallScreenAlert";
import UnhappyBrowser from "./containers/unhappyBrowser";
import Navigation from "./components/navigation";

class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <UnhappyBrowser />
        <SmallScreenAlert />
        <Navigation />
        <Switch>
          <Route path="/faq" component={Faq} />
          <Route path="/slack" component={Slack} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/github" component={Github} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </AppContainer>
    );
  }
}

export default hot(module)(() => <App classname="app" />);
