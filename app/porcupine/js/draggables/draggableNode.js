import React from "react";
import { DragSource, ConnectDragSource, ConnectDragPreview } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import ItemTypes from "../components/itemTypes";
import NodeContainer from "../containers/nodeContainer";

const boxSource = {
  beginDrag(props) {
    return props;
  }
};

const getStyles = props => {
  const { left, top, isDragging } = props;
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    // transform,
    // WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : ""
  };
};

@DragSource(ItemTypes.NODE, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
class NodeDragLayer extends React.PureComponent {
  componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      // 	Use empty image as a drag preview so browsers don't draw it
      // 	and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // 		IE fallback: specify that we'd rather screenshot the node
        // 		when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true
      });
    }
  }

  render() {
    const { title, connectDragSource } = this.props;
    const { props } = this;
    return (
      connectDragSource &&
      connectDragSource(
        <g style={getStyles(this.props)}>
          <NodeContainer {...this.props} />
        </g>
      )
    );
  }
}

export default NodeDragLayer;
