import React, { Fragment } from "react";
import Radium from "radium";

import Modals from "../../porcupine/containers/modals";

import Banner from "../components/banner";
import Footer from "../components/footer";
import User from "../components/user";
import SlackBanner from "../components/slackBanner";

const UserPage = ({ match }) => {
  const { username } = match.params;
  const bannerTitle = `Giraffe & ${username}`;

  return (
    <Fragment>
      <Modals />
      <Banner title={bannerTitle} />
      <User username={username} />
      <SlackBanner />
      <Footer />
    </Fragment>
  );
};

export default Radium(UserPage);
