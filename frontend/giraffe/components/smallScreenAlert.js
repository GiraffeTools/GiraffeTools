import React from "react";
import { StyleRoot } from "radium";
import Alert from "react-bootstrap/Alert";

import alertStyles from "../styles/alerts";
import styles from "../styles/smallScreenAlert";

const SmallScreenAlert = () => (
  <Alert
    variant="info"
    dismissible={true}
    style={{ ...alertStyles.alert, ...styles.smallScreen }}
  >
    Welcome! This website has not been optimised for small screens so things
    might look a bit quirky!
  </Alert>
);

export default SmallScreenAlert;
