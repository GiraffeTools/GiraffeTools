import React, { Fragment } from "react";
import Radium from "radium";
import PaneGroup from "./paneGroup";
import DraggablePaneElement from "../../draggables/draggablePaneElement";

import styles from "../../styles/toolboxGroup";

const ToolboxGroup = ({ toolbox, toggleToolbox, show }) => (
  <div style={[styles.toolboxBox]}>
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
        toolbox.categories.map(category => (
          <PaneGroup
            key={category.name}
            name={category.name}
            subcategories={category.categories}
            nodes={category.nodes}
            colour={category.colour}
          />
        ))}
      {show &&
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
        })}
    </div>
  </div>
);

export default Radium(ToolboxGroup);
