import React from 'react';
import Radium from 'radium';
import Col from 'react-bootstrap/Col';

import styles from '../styles/slackBanner.js';

const SlackBanner = () => (
  <div style={[styles.slack]}>
    <Col>
      <a href="/slack" style={[styles.slackLink]}>
        <img
          src="/static/img/slack_logo.svg"
          id="slack-logo"
          style={[styles.slackLogo]}
        />
        <span style={[styles.slackText]}>Join the team on Slack!</span>
      </a>
    </Col>
  </div>
);

export default Radium(SlackBanner);
