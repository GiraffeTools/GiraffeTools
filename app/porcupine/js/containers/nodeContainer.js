import { connect } from 'react-redux';

import Node from '../components/node';
import {
	nodes,
} from '../selectors/selectors';
import {
	hoverNode,
	clickNode,
	updateNodePosition,
	updatePortPosition,
} from '../actions';

const mapStateToProps = state => ({
	hoveredNode: state.scene.hoveredNode,
	selectedNode: state.scene.selectedNode,
})

const mapDispatchToProps = dispatch => ({
  hoverNode: (nodeId) => dispatch(hoverNode(nodeId)),
  clickNode: (nodeId) => dispatch(clickNode(nodeId)),
	updateNodePosition: (nodeId, offset) => dispatch(updateNodePosition(nodeId, offset)),
	updatePortPosition: (portId, offset) => dispatch(updatePortPosition(portId, offset)),
});

const NodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);

export default NodeContainer;
