import React, { Fragment } from "react";

// import DraggableNode from "../draggables/draggableNode";
import NodeContainer from "../containers/nodeContainer";

const Nodes = ({ nodes }) => (
  <Fragment>
    {nodes && nodes.map(node => <NodeContainer {...node} key={node.id} />)}
  </Fragment>
);

export default Nodes;
