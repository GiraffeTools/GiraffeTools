import React from 'react';
import {DragLayer} from 'react-dnd';

import styles from '../../styles/sidebar';

function collect(monitor) {
  const item = monitor.getItem();
  return {
    name: item && item.name,
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
    itemType: monitor.getItemType(),
  };
}

function getItemStyles(currentOffset) {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const x = currentOffset.x;
  const y = currentOffset.y;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    pointerEvents: 'none',
    transform: transform,
    WebkitTransform: transform,
  };
}

const ItemPreview = (props) => {
  if (!props.isDragging) {
    return <div className="node preview" style={{display: 'none'}} />;
  } else if (props.itemType === 'paneElement') {
    return (
      <div style={[styles.nodePreview, getItemStyles(props.currentOffset)]}>
        {props.name}
      </div>
    );
  } else if (props.itemType === 'node') {
    return <div className="node preview" style={{display: 'none'}} />;
  }
};

export default DragLayer(collect)(ItemPreview);
