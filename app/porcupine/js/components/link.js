import React from "react";
import { PathLine } from "react-svg-pathline";
import * as d3 from "d3";

class Link extends React.Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.connectPort = this.connectPort.bind(this);
    this.connect = this.connect.bind(this);

    this.state = {
      hovered: false
    };
  }

  componentDidMount() {
    d3.select(this.svgRef)
      .on("click", this.click)
      .on("mouseenter", () => this.hover(true))
      .on("mouseleave", () => this.hover(false));
  }

  click() {
    const { clickItem, id } = this.props;
    clickItem(id, "link");
    d3.event.stopPropagation();
  }

  hover(enter) {
    this.setState({
      hovered: enter
    });
    d3.event.stopPropagation();
  }

  connectPort(e, portKey) {
    e.stopPropagation();
    this.connect(e.target);
  }

  connect(el) {}

  render() {
    const { portFrom, portTo, selectedLinks, id } = this.props;
    if (!portFrom || !portTo) {
      return <g />;
    }
    let startingPoint = { x: portFrom.x, y: portFrom.y + 5 };
    let endPoint = { x: portTo.x, y: portTo.y + 5 };

    let d = "M";
    // starting point
    d += `${startingPoint.x} ${startingPoint.y}`;
    // control points
    d += ` C`;
    d += ` ${(startingPoint.x * 1) / 4 + (endPoint.x * 3) / 4} ${
      startingPoint.y
    }`;
    d += ` ${(startingPoint.x * 3) / 4 + (endPoint.x * 1) / 4} ${endPoint.y}`;
    // end point
    d += ` ${endPoint.x} ${endPoint.y}`;
    return (
      <path
        ref={svg => (this.svgRef = svg)}
        d={d}
        stroke="black"
        strokeWidth="2"
        fill="none"
        r={10}
        filter={
          selectedLinks && selectedLinks.includes(id)
            ? "url(#selection-glow)"
            : ""
        }
        cursor={"pointer"}
      />
    );
  }
}

export default Link;
