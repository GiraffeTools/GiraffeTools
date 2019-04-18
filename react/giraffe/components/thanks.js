import React from "react";
import Radium from "radium";

import styles from "../styles/thanks.js";

const Thanks = () => (
  <div className="container-fluid" style={[styles.thanks]}>
    <h3>With lots of thanks to:</h3>
    <img
      src="/static/img/donders_logo.svg"
      className="thanks-logo"
      style={[styles.thanksLogo]}
    />
    <img
      src="/static/img/gitcoin_logo.svg"
      className="thanks-logo"
      style={[styles.thanksLogo]}
    />
    <img
      src="/static/img/sidnfonds_logo.svg"
      className="thanks-logo"
      style={[styles.thanksLogo]}
    />
  </div>
);

export default Radium(Thanks);
