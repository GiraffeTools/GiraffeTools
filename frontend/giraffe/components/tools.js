import React from "react";
import Radium from "radium";
import Col from "react-bootstrap/Col";

import Porcupine from "./porcupine";
import Armadillo from "./armadillo";
import Axolotl from "./axolotl";
import styles from "../styles/tools";

const Tools = () => (
  <div style={[styles.tools]}>
    <Col sm={6} style={styles.ourTools}>
      <h2 style={[styles.ourToolsHeading]}>OUR TOOLS</h2>
    </Col>
    <Porcupine />
    <Armadillo />
    {/*<Axolotl />*/}
  </div>
);

export default Radium(Tools);
