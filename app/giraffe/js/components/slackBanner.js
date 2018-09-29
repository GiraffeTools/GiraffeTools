import React from "react";

const SlackBanner = () => (
  <div className="d-flex justify-content-center" id="slack">
    <div className="col">
      <a href="/slack">
        <img src="/static/img/slack_logo.svg" id="slack-logo" />
        <span id="slack-text">Join the team Slack!</span>
      </a>
    </div>
  </div>
);

export default SlackBanner;
