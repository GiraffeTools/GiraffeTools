import { connect } from "react-redux";

import Node from "../components/node";
import { clickNode, updateNodePosition, repositionPorts } from "../actions";

const mapStateToProps = state => ({
  selectedNode: state.scene.selectedNode
});

const mapDispatchToProps = dispatch => ({
  clickNode: nodeId => dispatch(clickNode(nodeId)),
  repositionPorts: node => dispatch(repositionPorts(node)),
  updateNodePosition: (nodeId, offset) =>
    dispatch(updateNodePosition(nodeId, offset))
});

const NodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);

export default NodeContainer;
