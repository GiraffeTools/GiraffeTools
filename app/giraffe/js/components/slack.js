import React, { Fragment } from "react";

import Banner from "./banner";
import Footer from "./footer";
import SlackBanner from "./slackBanner";
import SlackInvite from "./slackInvite";

const Slack = () => (
  <Fragment>
    <Banner />
    <SlackInvite />
    <SlackBanner />
    <Footer />
  </Fragment>
);

export default Slack;
