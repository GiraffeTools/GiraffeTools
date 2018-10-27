import React, { Fragment } from "react";
import * as d3 from "d3";
import { v4 } from "uuid";
import { PathLine } from "react-svg-pathline";

class Port extends React.Component {
  constructor(props) {
    super(props);
    this.hover = this.hover.bind(this);
    this.leave = this.leave.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.state = {
      linkUnderConstruction: null
    };
  }

  componentDidMount() {
    d3.select(this.input)
      .on("mouseenter", this.hover)
      .on("mousleave", this.leave)
      .call(d3.drag().on("start", () => this.drag("input")));
    d3.select(this.output)
      .on("mouseenter", this.hover)
      .on("mousleave", this.leave)
      .call(d3.drag().on("start", () => this.drag("output")));
  }

  click() {
    d3.event.stopPropagation();
  }

  hover() {
    const { hoverPort, id } = this.props;
    hoverPort(this.props.id);
  }

  leave() {
    const { hoverPort } = this.props;
    hoverPort(null);
  }

  endDrag(type) {
    const { addLink, hoveredPort, isInput, isOutput, id } = this.props;
    if (hoveredPort.isInput == isOutput || hoveredPort.isOutput == isInput) {
      addLink({
        id: v4(),
        portFrom: type === "output" ? id : hoveredPort.id,
        portTo: type === "input" ? id : hoveredPort.id
      });
    }
    this.setState({ linkUnderConstruction: null });
  }

  drag(type) {
    const { startLink, hoveredPort, x, y, id } = this.props;
    this.setState({
      linkUnderConstruction: { x, y }
    });
    startLink(id);

    let dx = 0,
      dy = 0;
    function dragged(t) {
      dx += d3.event.dx;
      dy += d3.event.dy;
      t.setState({
        linkUnderConstruction: { x: x + dx, y: y + dy }
      });
    }

    d3.event
      .on("drag", () => dragged(this))
      .on("end", () => this.endDrag(type));
  }

  render() {
    const { name, isInput, isOutput, id } = this.props;

    const { x, y, width } = this.props;
    const { linkUnderConstruction } = this.state;

    return (
      <Fragment>
        <text fill="white" textAnchor="middle" x={x + width / 2} y={y}>
          {name}
        </text>
        {isInput && (
          <circle
            ref={e => (this.input = e)}
            cx={x}
            cy={y - 4}
            r={4}
            fill="#3498db"
            cursor="pointer"
          />
        )}
        {isOutput && (
          <circle
            ref={e => (this.output = e)}
            cx={x + width}
            cy={y - 4}
            r={4}
            fill="#e74c3c"
            cursor="pointer"
          />
        )}

        {linkUnderConstruction && (
          <PathLine
            points={[
              { x: x + (isInput ? 0 : width), y: y - 4 },
              {
                x: linkUnderConstruction.x + (isInput ? 0 : width),
                y: linkUnderConstruction.y - 4
              }
            ]}
            stroke="black"
            strokeWidth="2"
            fill="none"
            r={10}
          />
        )}
      </Fragment>
    );
  }
}

export default Port;
