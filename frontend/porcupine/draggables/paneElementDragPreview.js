import React from 'react';
import PaneElement from '../components/sidebar/paneElement';

const styles = {
  // transform: 'rotate(-2deg)',
  // WebkitTransform: 'rotate(-2deg)',
};

const PaneElementDragPreview = (props) => (
  <div style={styles}>
    <PaneElement {...props} />
  </div>
);

export default PaneElementDragPreview;
