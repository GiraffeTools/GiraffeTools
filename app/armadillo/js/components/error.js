import React from "react";
import Radium from "radium";

import styles from "../styles/error";

const Error = ({ error }) => (
  <div
    style={[styles.error, !error && styles.error.close]}
  />
)

export default Radium(Error);
