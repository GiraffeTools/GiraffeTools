import React from "react";
import PaneElement from "../components/paneElement";

const styles = {
  // transform: 'rotate(-2deg)',
  // WebkitTransform: 'rotate(-2deg)',
};

class PaneElementDragPreview extends React.PureComponent {
  render() {
    return (
      <div style={styles}>
        <PaneElement {...this.props} />
      </div>
    );
  }
}

export default PaneElementDragPreview;
