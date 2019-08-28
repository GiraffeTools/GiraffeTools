import {connect} from 'react-redux';

import Node from '../components/canvas/node';
import {clickItem, updateNode} from '../actions';

const mapStateToProps = (state) => ({
  selectedNodes: state.scene.selection && state.scene.selection.nodes,
  scale: state.scene.scale
});

const mapDispatchToProps = (dispatch) => ({
  clickItem: (nodeId, type) => dispatch(clickItem(nodeId, type)),
  updateNode: (nodeId, offset) => dispatch(updateNode(nodeId, offset)),
});

const NodeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Node);

export default NodeContainer;
