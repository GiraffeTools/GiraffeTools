import React from "react";
import * as d3 from 'd3';

import ItemTypes from "./itemTypes";
import PortContainer from "../containers/portContainer";

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.hover = this.hover.bind(this);
    this.drag = this.drag.bind(this);

    this.state = {
      hovered: false
    };
  }

  componentDidMount() {
    d3
      .select(this.svgRef)
      .on("click", this.click)
      .on("mouseenter", () => this.hover(true))
      .on("mouseleave", () => this.hover(false))
      .call(d3.drag().on("start", () => this.drag()));
  }

  click() {
    const { clickNode, id } = this.props;
    clickNode(id);
    d3.event.stopPropagation();
  }

  hover(enter) {
    const { hoverNode, id } = this.props;
    hoverNode(enter ? id : null);
    this.setState({
      hovered: enter
    })
    d3.event.stopPropagation();
  }

  drag() {
    const { x, y, id, updateNodePosition } = this.props;
    let dx = 0, dy = 0;
    function dragged() {
      dx += d3.event.dx
      dy += d3.event.dy
      updateNodePosition(id, {x: x + dx, y: y + dy})
    }

    function ended() {
    }
    d3.event
      .on("drag", dragged)
      .on("end", ended);
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
          x={0}
          y={dy}
        />
      );
      dy += 24;
    })

    return (
      <g
        ref={(svg) => this.svgRef = svg}
        transform={`translate(${x},${y})`}
      >
        <rect
          fill={colour}
          rx={6}
          ry={6}
          width={`${width}px`}
          height={dy}
        />
        <text
          fill="white"
          textAnchor="middle"
          x={width / 2}
          y={28}
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
      //   onTouchEnd={event => this.click(event, id)}
      //   onMouseEnter={event => this.hover(event, id)}
      //   onMouseLeave={event => this.hover(event, null)}
      //   onDrag={event => this.drag(event, id)}
      //   data-tip="tooltip"
      //   data-for="getContent"
      // >
    );
    return content;
  }
}

export default Node;
