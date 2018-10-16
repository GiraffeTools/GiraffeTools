import React from "react";
import { DragLayer, XYCoord } from "react-dnd";
import ItemTypes from "../components/itemTypes";
import NodeDragPreview from "./NodeDragPreview";
import PaneElementDragPreview from "./NodeDragPreview";
// import snapToGrid from './snapToGrid'

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }

  let { x, y } = currentOffset;
  // if (props.snapToGrid) {
  // 	x -= initialOffset.x
  // 	y -= initialOffset.y
  // 	;[x, y] = snapToGrid(x, y)
  // 	x += initialOffset.x
  // 	y += initialOffset.y
  // }

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
}

const CustomDragLayer = props => {
  const { item, itemType, isDragging } = props;
  function renderItem() {
    switch (itemType) {
      case ItemTypes.NODE:
        return <NodeDragPreview {...item} />;
      case ItemTypes.PANE_ELEMENT:
        return <PaneElementDragPreview {...item} />;
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(props)}>{renderItem()}</div>
    </div>
  );
};

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(CustomDragLayer);
