import React, { Fragment } from "react";

import DraggableNode from "../draggables/draggableNode";

const Nodes = ({ nodes }) => (
  <Fragment>
    {nodes.map(node => (
      <DraggableNode {...node} key={node.id} />
    ))}
  </Fragment>
);

export default Nodes;
