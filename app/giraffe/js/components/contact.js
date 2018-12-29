import React from "react";
import Radium from "radium";

import styles from "../styles/contact.js";

const Contact = () => (
  <div
    className="d-flex justify-content-begin position-relative"
    style={[styles.contact]}
  >
    <div
      className="col-5 position-absolute text-center"
      style={[styles.joinUs]}
    >
      <h4 style={[styles.joinHeading]}>Want to join us?</h4>
    </div>
    <div style={[styles.iconTitleText, styles.githubTag]}>
      <img style={[styles.iconTile]} src="/static/img/github_tag.png" />
      <span>@TimVanMourik</span>
    </div>
    <div style={[styles.iconTitleText, styles.mailTag]}>
      <span>Get in touch</span>
      <img style={[styles.iconTile]} src="/static/img/mail_tag.png" />
    </div>
  </div>
);

export default Radium(Contact);
