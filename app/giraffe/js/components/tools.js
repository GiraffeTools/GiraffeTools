import React from "react";
import Radium from "radium";

import Porcupine from "./porcupine";
import Armadillo from "./armadillo";
import styles from "../styles/tools";

const Tools = () => (
  <div style={[styles.tools]}>
    <div className="col-6 text-center" style={[styles.ourTools]}>
      <h2 style={[styles.ourToolsHeading]}>OUR TOOLS</h2>
    </div>
    <Porcupine />
    <Armadillo />
  </div>
);

export default Radium(Tools);
