import React, { Fragment, useState } from "react";
import Radium from "radium";
import PaneGroup from "./paneGroup";
import DraggablePaneElement from "../../draggables/draggablePaneElement";
import Collapse from "react-bootstrap/Collapse";

import styles from "../../styles/toolboxGroup";

const ToolboxGroup = ({ toolbox }) => {
  const [open, toggleToolbox] = useState(false);

  const paneGroups =
    toolbox &&
    toolbox.categories &&
    toolbox.categories.map(category => (
      <PaneGroup
        key={category.name}
        name={category.name}
        subcategories={category.categories}
        nodes={category.nodes}
        colour={category.colour}
      />
    ));
  const nodes =
    toolbox &&
    toolbox.nodes &&
    toolbox.nodes.map(node => {
      const { name } = node;
      node.colour = toolbox.colour || "#BBB";
      return (
        <DraggablePaneElement key={name} category={node} id={name}>
          {name}
        </DraggablePaneElement>
      );
    });

  return (
    <div style={styles.toolboxBox}>
      <h6
        style={styles.toolboxHeader}
        onClick={() => toggleToolbox(!open)}
        aria-controls="collapse-answer"
        aria-expanded={open}
      >
        <span style={styles.toolboxName}>{toolbox.name.toUpperCase()}</span>
        <img style={{ ...styles.expand }} src="/static/img/arrow-right.svg" />
      </h6>
      {
        <Collapse id="collapse-group" in={open}>
          <div>
            {paneGroups}
            {nodes}
          </div>
        </Collapse>
      }
    </div>
  );
};

// export default Radium(ToolboxGroup);
export default ToolboxGroup;
