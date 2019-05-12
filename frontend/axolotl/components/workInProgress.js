import React from "react";
import Radium from "radium";

import styles from "../styles/workInProgress.js";

const WorkInProgress = () => (
  <div style={[styles.background]}>
    <span style={[styles.bannerText]}>Axolotl is still work in progress!</span>
  </div>
);

export default Radium(WorkInProgress);
