import React from "react";
import * as d3 from "d3";

import ItemTypes from "./itemTypes";
import Parameter from "./parameter";
import Tooltip from "./tooltip";

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
    d3.select(this.svgRef)
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
    this.setState({
      hovered: enter
    });
    d3.event.stopPropagation();
  }

  drag() {
    const { x, y, width, id, updateNodePosition, repositionPorts } = this.props;
    let dx = 0,
      dy = 0;
    function dragged() {
      dx += d3.event.dx;
      dy += d3.event.dy;
      updateNodePosition(id, { x: x + dx, y: y + dy });
      repositionPorts({ x: x + dx, y: y + dy, width, id });
    }

    function ended() {}
    d3.event.on("drag", dragged).on("end", ended);
  }

  render() {
    const {
      id,
      name,
      x,
      y,
      width,
      colour,
      selectedNode,
      parameters
    } = this.props;
    const { hovered } = this.state;

    const parameterBlock = [];
    let dy = 54;
    parameters &&
      parameters
        .filter(parameter => parameter.isVisible == true)
        .forEach(parameter => {
          parameterBlock.push(
            <Parameter
              {...parameter}
              key={parameter.id}
              width={width}
              x={0}
              y={dy}
            />
          );
          dy += 24;
        });

    return (
      <g ref={svg => (this.svgRef = svg)} transform={`translate(${x},${y})`}>
        <rect fill={colour} rx={6} ry={6} width={`${width}px`} height={dy} />
        <text
          fill="white"
          textAnchor="middle"
          x={width / 2}
          y={28}
          fontSize={"1.4rem"}
        >
          {name}
        </text>
        {parameterBlock}
        {hovered && <Tooltip parameters={parameters} />}
      </g>
    );
    return content;
  }
}

export default Node;
