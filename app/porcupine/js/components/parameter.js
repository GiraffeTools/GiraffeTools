import React, { Fragment } from "react";
import * as d3 from "d3";
import { v4 } from "uuid";
import { PathLine } from "react-svg-pathline";

import PortContainer from "../containers/portContainer";

class PortPair extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, input, output, x, y, width, id } = this.props;
    return (
      <Fragment>
        <text fill="white" textAnchor="middle" x={x + width / 2} y={y}>
          {name}
        </text>
        {input && <PortContainer id={id} type="input" x={x} y={y - 4} />}
        {output && (
          <PortContainer id={id} type="output" x={x + width} y={y - 4} />
        )}
      </Fragment>
    );
  }
}

export default PortPair;
