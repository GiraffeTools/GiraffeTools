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
          className="badge"
          style={[styles.sidebarBadge, { backgroundColor: color }]}
        >
          {" "}
        </span>
        {name}
        <span
          style={[styles.sidebarDropdown]}
        >
          {">"}
        </span>
      </a>
    </div>
  );
};

export default Radium(PaneHeader);
