import { connect } from "react-redux";

import Canvas from "../components/canvas";
import {
  addNode,
  addLink,
  clearDatabase,
  addPortToNode,
  repositionPorts,
  clickScene,
  updateLoadingPercent
} from "../actions";
import { nodesWithPorts, linksWithPorts } from "../selectors/selectors";

const mapStateToProps = state => ({
  loadingPercent: state.ui.loadingPercent,
  nodes: nodesWithPorts(state),
  links: linksWithPorts(state)
});

const mapDispatchToProps = dispatch => ({
  addNode: node => dispatch(addNode(node)),
  addLink: link => dispatch(addLink(link)),
  addPortToNode: (port, nodeId) => dispatch(addPortToNode(port, nodeId)),
  clickScene: () => dispatch(clickScene()),
  repositionPorts: node => dispatch(repositionPorts(node)),
  clearDatabase: () => dispatch(clearDatabase()),
  updateLoadingPercent: percent => dispatch(updateLoadingPercent(percent))
});

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);

export default CanvasContainer;
