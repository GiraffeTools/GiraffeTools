import React from "react";
import Radium from "radium";

import styles from "../styles/spinner";

const Spinner = ({ isLoading }) => (
  <div style={[styles.spinner, isLoading && styles.spinner.loading]} />
);

export default Radium(Spinner);
