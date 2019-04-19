import React from "react";
import Radium from "radium";
import { DragSource } from "react-dnd";

import ItemTypes from "../../draggables/itemTypes";
import styles from "../../styles/paneElement";

const PaneElement = props => {
  const { isDragging, connectDragSource, connectDragPreview, id } = props;

  const offset = { x: 0, y: 0 };
  return (
    <div
      className="btn btn-block"
      draggable="true"
      style={[styles.paneElement, { opacity: isDragging ? 0.5 : 1 }]}
      id={id}
    >
      {props.children}
    </div>
  );
};

export default Radium(PaneElement);
