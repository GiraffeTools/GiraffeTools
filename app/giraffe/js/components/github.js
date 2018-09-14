import React, { Fragment } from "react";

import Banner from "./banner";
import SlackBanner from "./slackBanner";

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Banner />
        <SlackBanner />
      </Fragment>
    );
  }
}

export default Content;
