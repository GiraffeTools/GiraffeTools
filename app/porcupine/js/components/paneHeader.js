import React from "react";
import Radium from "radium";

import styles from "../styles/paneHeader";

const PaneHeader = ({ name, color }) => {
  const divRef = "#" + name;
  return (
    <div style={[styles.panelHeading]} role="tab">
      <a
        style={[styles.panelLink]}
        data-toggle="collapse"
        aria-expanded="false"
        aria-controls={name}
      >
        <span
          className="badge sidebar-badge"
          style={{ backgroundColor: color }}
        >
          {" "}
        </span>
        {name}
        <span className="sidebar-dropdown">{">"}</span>
      </a>
    </div>
  );
};

export default Radium(PaneHeader);
