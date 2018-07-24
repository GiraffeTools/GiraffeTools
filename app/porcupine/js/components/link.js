import PropTypes from 'prop-types';
import React from 'react';
import { PathLine } from 'react-svg-pathline';


class Link extends React.Component {
  constructor(props) {
    super(props);
    this.connectPort   = this.connectPort.bind(this);
    this.connect       = this.connect.bind(this);
  }

  connectPort(e, portKey) {
    e.stopPropagation()
    this.connect(e.target)
  }

  connect(el) {

  }

  render() {
    const  { id, portFrom, portTo } = this.props;

    let startingPoint = portFrom && portFrom.outputPortRef ? portFrom.outputPortRef : null;
    let endPoint      = portTo   && portTo.inputPortRef    ? portTo.inputPortRef    : null;
    startingPoint = startingPoint && startingPoint.current ? startingPoint.current.getBoundingClientRect() : {x: 0, y: 0};
    endPoint      = endPoint      && endPoint.current      ? endPoint.current.getBoundingClientRect()      : {x: 0, y: 0};

    let viewport = {x: 0, y: 0}; // probably subtract the borders of the canvas
    startingPoint = {x: startingPoint.x - viewport.x, y: startingPoint.y - viewport.y};

    return (
      <svg>
        <PathLine
          points={[startingPoint,
                  // #TODO Add intermediate points to make the connection smoother
                  {x: (startingPoint.x + endPoint.x) / 2, y: startingPoint.y},
                  {x: (startingPoint.x + endPoint.x) / 2, y: endPoint.y},
                  endPoint]}
          stroke="red"
          strokeWidth="2"
          fill="none"
          r={10}
        />
      </svg>
    )
  }
}

export default Link;
