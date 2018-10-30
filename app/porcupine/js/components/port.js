import React, { Fragment } from "react";
import * as d3 from "d3";
import { v4 } from "uuid";
import { PathLine } from "react-svg-pathline";

class Port extends React.Component {
  constructor(props) {
    super(props);
    this.hover = this.hover.bind(this);
    this.leave = this.leave.bind(this);
    this.state = {
      linkUnderConstruction: null
    };
  }

  componentDidMount() {
    d3.select(this.port)
      .on("mouseenter", this.hover)
      .on("mousleave", this.leave)
      .call(d3.drag().on("start", () => this.drag(this.props.type)));
  }

  click() {
    d3.event.stopPropagation();
  }

  hover() {
    const { hoverPort, id, type } = this.props;
    hoverPort(id, type);
  }

  leave() {
    const { hoverPort } = this.props;
    hoverPort(null);
  }

  drag(type) {
    const { startLink, x, y, id } = this.props;
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

    function endDrag(t) {
      const { addLink, hoveredPort, id, type } = t.props;
      if (hoveredPort && hoveredPort.type !== type) {
        addLink({
          id: v4(),
          portFrom: type === "output" ? id : hoveredPort.id,
          portTo: type === "input" ? id : hoveredPort.id
        });
      }
      t.setState({
        linkUnderConstruction: null
      });
    }

    d3.event.on("drag", () => dragged(this)).on("end", () => endDrag(this));
  }

  render() {
    const { type } = this.props;

    const { x, y, width } = this.props;
    const { linkUnderConstruction } = this.state;

    return (
      <Fragment>
        <circle
          ref={e => (this.port = e)}
          cx={x}
          cy={y}
          r={4}
          fill={type === "input" ? "#3498db" : "#e74c3c"}
          cursor="pointer"
        />
        {linkUnderConstruction && (
          <PathLine
            points={[
              { x, y },
              { x: linkUnderConstruction.x, y: linkUnderConstruction.y }
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
