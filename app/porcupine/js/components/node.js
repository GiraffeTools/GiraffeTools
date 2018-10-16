import React from "react";

import ItemTypes from "./itemTypes";
import PortContainer from "../containers/portContainer";

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
      ports
    } = this.props;
    // ports = ports.filter(port => port.isVisible == true);

    return (
      <div
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
            {ports &&
              ports.filter(port => port.isVisible == true).map(port => {
                return <PortContainer {...port} key={port.id} />;
              })}
          </ul>
        </div>
      </div>
    );
    return content;
  }
}

export default Node;
