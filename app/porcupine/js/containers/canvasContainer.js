import { connect } from "react-redux";

import Canvas from "../components/canvas";

import { nodesWithParameters, linksWithPorts } from "../selectors/selectors";
import {
  addNode,
  addLink,
  clearDatabase,
  repositionPorts,
  updateNodePosition,
  clickScene,
  updateLoadingPercent,
  setPorkFile
} from "../actions";

const mapStateToProps = state => ({
  loadingPercent: state.ui.loadingPercent,
  user: state.user,
  nodes: nodesWithParameters(state),
  links: linksWithPorts(state)
});

const mapDispatchToProps = dispatch => ({
  addNode: node => dispatch(addNode(node)),
  addLink: link => dispatch(addLink(link)),
  setPorkFile: porkfile => dispatch(setPorkFile(porkfile)),
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
