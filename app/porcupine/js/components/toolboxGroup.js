import React, { Fragment } from "react";
import Radium from "radium";
import PaneGroup from "./paneGroup";

import styles from "../styles/toolboxGroup";

const ToolboxGroup = ({ toolbox, toggleToolbox, show }) => (
  <div>
    <h6 style={[styles.toolboxHeader]}>
      <span>{toolbox.name.toUpperCase()}</span>
      <img
        style={[styles.expand, show && styles.expand.close]}
        src="/static/img/arrow-right.svg"
        onClick={() => toggleToolbox(toolbox.name)}
      />
    </h6>
    <div>
      {show &&
        toolbox &&
        toolbox.categories &&
        Object.keys(toolbox.categories).map(category => (
          <PaneGroup
            key={category}
            category={category}
            nodes={toolbox.categories[category]}
          />
        ))}
    </div>
  </div>
);

export default Radium(ToolboxGroup);
