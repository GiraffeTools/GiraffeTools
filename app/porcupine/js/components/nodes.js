import React, { Fragment } from "react";

// import DraggableNode from "../draggables/draggableNode";
import NodeContainer from "../containers/nodeContainer";

const Nodes = ({ nodes }) => (
  <Fragment>
    {/*nodes.length && (
      <h4 className="text-center" id="placeholder">
        Drag your nodes here!
      </h4>
    )*/}
    {nodes.map(node => (
      <NodeContainer
        {...node} key={node.id}
      />
    ))}
  </Fragment>
);

export default Nodes;
