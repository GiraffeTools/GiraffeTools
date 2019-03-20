import React, { Fragment } from "react";
import * as d3 from "d3";
import { v4 } from "uuid";
import { PathLine } from "react-svg-pathline";

import Port from "../../containers/port";

const PortPair = ({ name, input, output, x, y, width, id }) => (
  <Fragment>
    <text fill="white" textAnchor="middle" x={x + width / 2} y={y}>
      {name}
    </text>
    {input && <Port id={input} type="input" x={x} y={y - 4} />}
    {output && <Port id={output} type="output" x={x + width} y={y - 4} />}
  </Fragment>
);

export default PortPair;
