import PropTypes from "prop-types";
import React from "react";
import { DragSource } from "react-dnd";

import ItemTypes from "./itemTypes";
// import Ports from './ports';
import PortContainer from "../containers/portContainer";

const boxSource = {
  beginDrag(props) {
    event.stopPropagation();
    return {
      key: props.id,
      type: props.type
    };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const offset = monitor.getDifferenceFromInitialOffset();
    if (item) {
      // TODO: item.key => item.id
      props.updateNodePosition(item.key, {
        x: props.x + offset.x,
        y: props.y + offset.y
      });
      //HACK: passing on all props is dirty
      props.repositionPorts({
        ...props,
        x: props.x + offset.x,
        y: props.y + offset.y
      });
    }
  }
};

class Node extends React.Component {
  constructor(props) {
    super(props);
  }

  click(event, nodeId) {
    const { clickNode } = this.props;
    clickNode(nodeId);
    event.stopPropagation();
  }

  hover(event, nodeId) {
    const { hoverNode } = this.props;
    hoverNode(nodeId);
    event.stopPropagation();
  }

  drag(event, nodeId) {
    event.stopPropagation();
  }

  render() {
    const {
      id,
      name,
      x,
      y,
      width,
      colour,
      hoveredNode,
      selectedNode,
      ports,
      isDragging,
      connectDragSource,
      connectDragPreview
    } = this.props;
    // ports = ports.filter(port => port.isVisible == true);

    let content = (
      <div
        draggable="true"
        className={
          "node" +
          (selectedNode && id === selectedNode ? " selected" : "") +
          (id === hoveredNode ? " hover" : "")
        }
        style={{
          left: `${x}px`,
          top: `${y}px`,
          width: `${width}px`,
          minWidth: `${width}px`,
          maxWidth: `${width}px`,
          background: colour
        }}
        onClick={event => this.click(event, id)}
        onTouchEnd={event => this.click(event, id)}
        onMouseEnter={event => this.hover(event, id)}
        onMouseLeave={event => this.hover(event, null)}
        onDrag={event => this.drag(event, id)}
        data-tip="tooltip"
        data-for="getContent"
      >
        <div className="node__type">{name}</div>
        <div className="node__ports">
          <ul>
            {ports.filter(port => port.isVisible == true).map(port => {
              return <PortContainer {...port} key={port.id} />;
            })}
          </ul>
        </div>
      </div>
    );

    content = connectDragSource(content);
    // content = connectDragPreview(content);
    return content;
  }
}

Node.propTypes = {
  name: PropTypes.string.isRequired,
  colour: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  class: PropTypes.string
  // connectDragSource: PropTypes.func.isRequired,
  // connectDragPreview: PropTypes.func.isRequired,
  // isDragging: PropTypes.bool.isRequired,
};

export default (Node = DragSource(
  ItemTypes.Node,
  boxSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    //   connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)(Node));
