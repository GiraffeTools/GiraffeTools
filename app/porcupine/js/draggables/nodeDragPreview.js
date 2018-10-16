import React from "react";
import NodeContainer from "../containers/nodeContainer";

const styles = {
  // transform: 'rotate(-2deg)',
  // WebkitTransform: 'rotate(-2deg)',
};

class NodeDragPreview extends React.PureComponent {
  render() {
    return (
      <div style={styles}>
        <NodeContainer {...this.props} />
      </div>
    );
  }
}

export default NodeDragPreview;
