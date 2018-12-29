import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Banner from "./banner";
import Repository from "./repository";
import User from "./user";
import SlackBanner from "./slackBanner";

class GitHub extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route
          path={match.url + "/:username/:repository"}
          component={Repository}
        />
        <Route path={match.url + "/:username"} component={User} />
      </Switch>
    );
  }
}

export default GitHub;
