import React from "react";
import Radium from "radium";

import styleSheet from "../constants/styles";
import styles from "../styles/separatorWithOpenCircle";

const SeparatorWithOpenCircle = ({ color, thickness, styleOverwrite }) => {
  let separatorColor = "black";
  let separatorThickness = thickness || "1px";
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
        {
          backgroundColor: separatorColor,
          height: separatorThickness
        }
      ]}
    >
      <div
        style={[
          styles.circle,
          styles.left,
          { borderColor: separatorColor, borderWidth: separatorThickness }
        ]}
      />
      <div
        style={[
          styles.circle,
          styles.right,
          { borderColor: separatorColor, borderWidth: separatorThickness }
        ]}
      />
    </div>
  );
};
export default Radium(SeparatorWithOpenCircle);
