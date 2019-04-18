import React, { Fragment } from "react";

// import DraggableNode from "../draggables/draggableNode";
import Node from "../../containers/node";

const Nodes = ({ nodes }) => (
  <Fragment>
    {nodes && nodes.map(node => <Node {...node} key={node.id} />)}
  </Fragment>
);

export default Nodes;
