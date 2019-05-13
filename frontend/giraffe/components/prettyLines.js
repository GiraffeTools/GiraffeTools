import React from "react";
import Radium from "radium";

import styleSheet from "../constants/styles";
import styles from "../styles/prettyLines";

const PrettyLine = ({ color }) => {
  let separatorColor = color || "black";
  let separatorThickness = "2px";

  return (
    <div
      style={{
        ...styles.separator,
        backgroundColor: separatorColor
        // height: separatorThickness
      }}
    >
      <div
        style={{
          ...styles.circle,
          borderRightColor: separatorColor,
          borderWidth: separatorThickness
        }}
      />
    </div>
  );
};

const Line = ({ color }) => {
  let separatorColor = color || "black";
  let separatorThickness = "2px";

  return (
    <div
      style={{
        ...styles.separator,
        backgroundColor: separatorColor,
        height: separatorThickness
      }}
    />
  );
};

const PrettyLines = () => (
  <div style={[styles.giraffeLines]}>
    <div style={{ height: "100%" }}>
      <PrettyLine color={styleSheet.secondaryColor} />
      <PrettyLine color={styleSheet.primaryColor} />
      <PrettyLine color={styleSheet.secondaryColor} />
    </div>
    <div>
      <Line color={styleSheet.secondaryColor} />
      <Line color={styleSheet.primaryColor} />
      <Line color={styleSheet.secondaryColor} />
    </div>
  </div>
);

export default Radium(PrettyLines);
