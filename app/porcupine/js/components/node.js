import PropTypes from 'prop-types';
import React from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';

import ItemTypes from './itemTypes';
import Ports from '../containers/ports';
import {
	hoverNode,
	clickNode,
	updateNodePosition,
} from '../actions/index';


const boxSource = {
  beginDrag(props) {
		event.stopPropagation();
    return {
      key: props.id,
      type: props.type
    }
  },
  endDrag(props, monitor) {
   const item = monitor.getItem()
   // const dropResult = monitor.getDropResult()
   const offset = monitor.getDifferenceFromInitialOffset()
   if (item) {
		 props.updateNodePosition(item.key, {x: props.x + offset.x, y: props.y + offset.y} );
   }
  },
}

class Node extends React.Component {
  constructor(props) {
    super(props);
  }

  click(event, nodeId) {
    const { clickNode } = this.props;
    clickNode(nodeId);
    event.stopPropagation();
  }

  hover(event, nodeId) {
    const { hoverNode } = this.props;
    hoverNode(nodeId);
    event.stopPropagation();
  }

  drag(event, nodeId) {
		// When zoomed in, dragging nodes is impossible, as it drags the view instead.
		// #TODO issue #73, figure this out.
		// console.log('drag function');
    event.stopPropagation();
  }

  render() {
    const {
      id,
      name,
      x,
      y,
      colour,
			hoveredNode,
			selectedNode,
      ports,
      isDragging, connectDragSource, connectDragPreview } = this.props;
    let content = (
      <div
				draggable="true"
        className={'node' + (id === selectedNode ? ' selected' : '') + (id === hoveredNode ? ' hover' : '')}
        style={{
          left:`${x}px`,
          top: `${y}px`,
          background: colour
        }}
        onClick     ={(event) => this.click(event, id)}
        onTouchEnd  ={(event) => this.click(event, id)}
        onMouseEnter={(event) => this.hover(event, id)}
        onMouseLeave={(event) => this.hover(event, null)}
				onDrag 			={(event) => this.drag (event, id)}
        data-tip='tooltip'
        data-for='getContent'
      >
        <div className="node__type">
          { name }
        </div>

        <Ports
          ports={ports}
        />
      </div>
    )

    content = connectDragSource(content);
    // content = connectDragPreview(content);
    return content;
  }
}

Node.propTypes = {
  name:   PropTypes.string.isRequired,
  colour: PropTypes.string.isRequired,
  x:      PropTypes.number.isRequired,
  y:      PropTypes.number.isRequired,
  class:  PropTypes.string,
  // connectDragSource: PropTypes.func.isRequired,
  // connectDragPreview: PropTypes.func.isRequired,
  // isDragging: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
	hoveredNode: state.scene.hoveredNode,
	selectedNode: state.scene.selectedNode,
})

const mapDispatchToProps = dispatch => ({
	hoverNode: (nodeId) => dispatch(hoverNode(nodeId)),
  clickNode: (nodeId) => dispatch(clickNode(nodeId)),
	updateNodePosition: (nodeId, offset) => dispatch(updateNodePosition(nodeId, offset)),
});


Node = DragSource(ItemTypes.Node, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
//   connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))(Node)

export default Node = connect(
	mapStateToProps,
	mapDispatchToProps
)(Node);
