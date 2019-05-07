import React from "react";
import Radium from "radium";

import styleSheet from "../constants/styles";
import styles from "../styles/separatorWithOpenCircle";

const SeparatorWithOpenCircle = ({ color, styleOverwrite }) => {
  let separatorColor = "black";
  switch (color) {
    case "primary":
      separatorColor = styleSheet.primaryColor;
      break;
    case "secondary":
      separatorColor = styleSheet.secondaryColor;
      break;
    default:
      separatorColor = color;
      break;
  }

  return (
    <div
      style={[
        styles.separator,
        styleOverwrite,
        { backgroundColor: separatorColor }
      ]}
    >
      <div
        style={[styles.circle, styles.left, { borderColor: separatorColor }]}
      />
      <div
        style={[styles.circle, styles.right, { borderColor: separatorColor }]}
      />
    </div>
  );
};
export default Radium(SeparatorWithOpenCircle);
