import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Banner from "./banner";
import Project from "./project";
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
          component={Project}
        />
        <Route path={match.url + "/:username"} component={User} />
      </Switch>
    );
  }
}

export default GitHub;
