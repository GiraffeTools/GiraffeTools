import { connect } from "react-redux";

import Canvas from "../components/canvas";
import {
  addNode,
  addLink,
  clearDatabase,
  repositionPorts,
  updateNodePosition,
  clickScene,
  updateLoadingPercent
} from "../actions";
import { nodesWithParameters, linksWithPorts } from "../selectors/selectors";

const mapStateToProps = state => ({
  loadingPercent: state.ui.loadingPercent,
  nodes: nodesWithParameters(state),
  links: linksWithPorts(state),
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  addNode: node => dispatch(addNode(node)),
  addLink: link => dispatch(addLink(link)),
  addParameterToNode: (parameter, nodeId) =>
    dispatch(addParameterToNode(parameter, nodeId)),
  clickScene: () => dispatch(clickScene()),
  repositionPorts: node => dispatch(repositionPorts(node)),
  updateLoadingPercent: percent => dispatch(updateLoadingPercent(percent)),
  updateNodePosition: (nodeId, offset) =>
    dispatch(updateNodePosition(nodeId, offset)),
  clearDatabase: () => dispatch(clearDatabase())
});

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);

export default CanvasContainer;
