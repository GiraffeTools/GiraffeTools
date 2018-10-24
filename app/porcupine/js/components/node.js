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

    const portBlock = []
    let dy = 54;
    ports && ports.filter(port => port.isVisible == true).forEach(port => {
      portBlock.push(
        <PortContainer {...port} key={port.id}
          width={width}
          x={x}
          y={y + dy}
        />
      );
      dy += 24;
    })

    return (
      <g>
        <rect
          fill={colour}
          x={`${x}px`}
          y={`${y}px`}
          rx={6}
          ry={6}
          width={`${width}px`}
          height={dy}
          onClick={()=>console.log("test")}
        />
        <text
          fill="white"
          textAnchor="middle"
          x={x + width / 2}
          y={y + 28}
          fontSize={"1.4rem"}
        >
          {name}
        </text>
        {portBlock}
      </g>

      //   className={
      //     "node" +
      //     (selectedNode && id === selectedNode ? " selected" : "") +
      //     (id === hoveredNode ? " hover" : "")
      //   }
      //   style={{
      //     left: `${x}px`,
      //     top: `${y}px`,
      //     width: `${width}px`,
      //     minWidth: `${width}px`,
      //     maxWidth: `${width}px`,
      //     background: colour
      //   }}
      //   onClick={event => this.click(event, id)}
      //   onTouchEnd={event => this.click(event, id)}
      //   onMouseEnter={event => this.hover(event, id)}
      //   onMouseLeave={event => this.hover(event, null)}
      //   onDrag={event => this.drag(event, id)}
      //   data-tip="tooltip"
      //   data-for="getContent"
      // >
      //   <div>{name}</div>


    );
    return content;
  }
}

export default Node;
