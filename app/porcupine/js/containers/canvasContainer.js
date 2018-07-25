import { connect } from 'react-redux';

import Canvas from '../components/canvas';
import {
	addNode,
	addPortToNode,
	clickScene,
} from '../actions';
import {
	nodes,
} from '../selectors/selectors';


const mapStateToProps = state => ({
	nodes: nodes(state),
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
