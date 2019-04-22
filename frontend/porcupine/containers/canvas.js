import { connect } from "react-redux";

import Canvas from "../components/canvas/canvas";

import { nodesWithParameters, linksWithPorts } from "../selectors/selectors";
import {
  addNode,
  addLink,
  addToolboxNodes,
  clearDatabase,
  updateNode,
  clickItem,
  deleteNode,
  deleteLink,
  updateLoadingPercent,
  setPorkFile
} from "../actions";

const mapStateToProps = state => ({
  loadingPercent: state.ui.loadingPercent,
  project: state.project,
  selection: state.scene.selection,
  nodes: nodesWithParameters(state),
  links: linksWithPorts(state)
});

const mapDispatchToProps = dispatch => ({
  addNode: node => dispatch(addNode(node)),
  addLink: link => dispatch(addLink(link)),
  deleteNode: nodeId => dispatch(deleteNode(nodeId)),
  deleteLink: linkId => dispatch(deleteLink(linkId)),
  setPorkFile: porkfile => dispatch(setPorkFile(porkfile)),
  clickItem: () => dispatch(clickItem()),
  updateLoadingPercent: percent => dispatch(updateLoadingPercent(percent)),
  updateNode: (nodeId, offset) => dispatch(updateNode(nodeId, offset)),
  addToolboxNodes: toolbox => dispatch(addToolboxNodes(toolbox)),
  clearDatabase: () => dispatch(clearDatabase())
});

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Canvas);

export default CanvasContainer;
