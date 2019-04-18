import React, { Fragment } from "react";

import Banner from "../components/banner";
import Footer from "../components/footer";
import SlackBanner from "../components/slackBanner";
import SlackInvite from "../components/slackInvite";

const Slack = () => (
  <Fragment>
    <Banner />
    <SlackInvite />
    <SlackBanner />
    <Footer />
  </Fragment>
);

export default Slack;
