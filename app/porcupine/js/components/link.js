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
    const { id, portFrom, portTo } = this.props;
    let startingPoint = portFrom
      ? { x: portFrom.x + 4, y: portFrom.y + 4 }
      : { x: 0, y: 0 };
    let endPoint = portTo
      ? { x: portTo.x + 4, y: portTo.y + 4 }
      : { x: 0, y: 0 };

    return (
      <svg>
        <PathLine
          points={[
            startingPoint,
            // #TODO Add intermediate points to make the connection smoother
            { x: (startingPoint.x + endPoint.x) / 2, y: startingPoint.y },
            { x: (startingPoint.x + endPoint.x) / 2, y: endPoint.y },
            endPoint
          ]}
          stroke="red"
          strokeWidth="2"
          fill="none"
          r={10}
        />
      </svg>
    );
  }
}

export default Link;
