import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Repository from "./repository";
import User from "../containers/user";

class GitHub extends React.Component {
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
