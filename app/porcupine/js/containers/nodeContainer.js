import { connect } from "react-redux";

import Node from "../components/node";
import { clickItem, updateNodePosition, repositionPorts } from "../actions";

const mapStateToProps = state => ({
  selectedNodes: state.scene.selection && state.scene.selection.nodes
});

const mapDispatchToProps = dispatch => ({
  clickItem: (nodeId, type) => dispatch(clickItem(nodeId, type)),
  repositionPorts: node => dispatch(repositionPorts(node)),
  updateNodePosition: (nodeId, offset) =>
    dispatch(updateNodePosition(nodeId, offset))
});

const NodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);

export default NodeContainer;
