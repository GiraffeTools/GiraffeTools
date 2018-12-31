import React from "react";
import Radium from "radium";

import styles from "../styles/slackBanner.js";

const SlackBanner = () => (
  <div className="d-flex justify-content-center" style={[styles.slack]}>
    <div className="col">
      <a href="/slack" style={[styles.slackLink]}>
        <img
          src="/static/img/slack_logo.svg"
          id="slack-logo"
          style={[styles.slackLogo]}
        />
        <span style={[styles.slackText]}>Join the team Slack!</span>
      </a>
    </div>
  </div>
);

export default Radium(SlackBanner);
