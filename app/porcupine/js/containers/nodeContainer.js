import { connect } from "react-redux";

import Node from "../components/node";
import {
  hoverNode,
  clickNode,
  updateNodePosition,
  repositionPorts
} from "../actions";

const mapStateToProps = state => ({
  hoveredNode: state.scene.hoveredNode,
  selectedNode: state.scene.selectedNode
});

const mapDispatchToProps = dispatch => ({
  hoverNode: nodeId => dispatch(hoverNode(nodeId)),
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
