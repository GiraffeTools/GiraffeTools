import React from "react";
import { StyleRoot } from "radium";

import styles from "../styles/smallScreenAlert";

const SmallScreenAlert = () => (
  <StyleRoot>
    <div
      className="alert alert-info alert-dismissible fade show"
      style={[styles.alertSmallScreen]}
      role="alert"
    >
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      Welcome! This website has not been optimised for small screens so things
      might look a bit quirky!
    </div>
  </StyleRoot>
);

export default SmallScreenAlert;
