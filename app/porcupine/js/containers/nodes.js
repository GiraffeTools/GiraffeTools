import React from 'react';
import { connect } from 'react-redux';

import Node from '../node';
import {
	nodeSelector,
} from '../selectors/selectors';


const mapStateToProps = state => ({
		nodes: nodeSelector(state),
})

const mapDispatchToProps = dispatch => ({
});

class Nodes extends React.Component {
  constructor(props) {
    super(props);
    this.clickNodeEvent       = this.clickNodeEvent.bind(this);
    this.hoverNodeEvent       = this.hoverNodeEvent.bind(this);
    this.leaveNodeEvent       = this.leaveNodeEvent.bind(this);
    this.updateNodePosition   = this.updateNodePosition.bind(this);
  }

  clickNodeEvent(event, nodeId) {
    if (this.clickOrDraggedNode === false && event.target.classList[0]!=="node__port--input") {
      this.props.changeSelectedNode(nodeId);
    } else if (this.clickOrDraggedNode === true) {
      this.clickOrDraggedNode = false;
    }
    event.stopPropagation();
  }

  hoverNodeEvent(event, nodeId) {
    this.props.changeHoveredNode(nodeId);
    event.stopPropagation();
  }

  leaveNodeEvent(event){
    this.props.changeHoveredNode(null);
    event.stopPropagation();
  }

  updateNodePosition(nodeId, offset) {
    if (!this.clickOrDraggedNode) {
      this.clickOrDraggedNode = true;
    }
    const node = this.props.net[nodeId];
    node.state.x += offset.x;
    node.state.y += offset.y;
    this.props.modifyNode(node, nodeId);
  }
  
  render() {
    return this.props.nodes.map(node => {
      return (
        <Node
          key 		= {node.id}
          y       = {node.y}
          x       = {node.x}
          name    = {node.name}
          colour  = {node.colour}
          // #TODO insert the right ports here, issue #72
          // ports		= {ports}
          click   = {this.clickNodeEvent}
          hover   = {this.hoverNodeEvent}
          leave   = {this.leaveNodeEvent}
          dragged = {this.updateNodePosition}
        />
      );
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nodes);
