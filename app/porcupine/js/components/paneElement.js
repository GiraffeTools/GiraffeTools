import React from "react";
import { DragSource } from "react-dnd";
import ItemTypes from "./itemTypes";

class PaneElement extends React.Component {
  render() {
    const { isDragging, connectDragSource, connectDragPreview } = this.props;

    const name = this.props.id;
    const offset = { x: 0, y: 0 };

    return (
      <div
        className="btn btn-block drowpdown-button"
        draggable="true"
        style={{ opacity: isDragging ? 0.5 : 1 }}
        id={this.props.id}
      >
        {this.props.children}
      </div>
    );
  }
}

export default PaneElement;
