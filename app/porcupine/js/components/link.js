import React from "react";
import { PathLine } from "react-svg-pathline";

class Link extends React.Component {
  constructor(props) {
    super(props);
    this.connectPort = this.connectPort.bind(this);
    this.connect = this.connect.bind(this);
  }

  connectPort(e, portKey) {
    e.stopPropagation();
    this.connect(e.target);
  }

  connect(el) {}

  render() {
    const { portFrom, portTo } = this.props;
    if (!portFrom || !portTo) {
      return <g />;
    }
    let startingPoint = { x: portFrom.x, y: portFrom.y + 5 };
    let endPoint = { x: portTo.x, y: portTo.y + 5 };

    return (
      <PathLine
        points={[
          startingPoint,
          // #TODO Add intermediate points to make the connection smoother
          { x: (startingPoint.x + endPoint.x) / 2, y: startingPoint.y },
          { x: (startingPoint.x + endPoint.x) / 2, y: endPoint.y },
          endPoint
        ]}
        stroke="black"
        strokeWidth="2"
        fill="none"
        r={10}
      />
    );
  }
}

export default Link;
