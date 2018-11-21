import React from "react";
import { DragSource } from "react-dnd";
import ItemTypes from "./itemTypes";

const PaneElement = props => {
  const { isDragging, connectDragSource, connectDragPreview, id } = props;

  const offset = { x: 0, y: 0 };
  return (
    <div
      className="btn btn-block drowpdown-button"
      draggable="true"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      id={id}
    >
      {props.children}
    </div>
  );
};

export default PaneElement;
