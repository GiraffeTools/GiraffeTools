import { connect } from 'react-redux';

import Canvas from '../components/canvas';
import {
	addNode,
	addPortToNode,
	clickScene,
} from '../actions';
import {
	nodesWithPorts,
	linksWithPorts,
} from '../selectors/selectors';


const mapStateToProps = state => ({
  nodes: nodesWithPorts(state),
	links: linksWithPorts(state),
})

const mapDispatchToProps = dispatch => ({
	addNode: (node) => dispatch(addNode(node)),
	addPortToNode: (port, nodeId) => dispatch(addPortToNode(port, nodeId)),
	clickScene: () => dispatch(clickScene()),
});

const CanvasContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Canvas);

export default CanvasContainer;
