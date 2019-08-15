import {connect} from 'react-redux';

import Canvas from '../components/canvas/canvas';

import {
  nodesWithParameters,
  linksWithPorts,
  stickies,
} from '../selectors/selectors';
import {
  addNode,
  addLink,
  addSticky,
  addGrammar,
  addToolboxNodes,
  clearDatabase,
  updateNode,
  clickItem,
  deleteNode,
  deleteLink,
  updateLoadingPercent,
} from '../actions';

const mapStateToProps = (state) => ({
  loadingPercent: state.ui.loadingPercent,
  project: state.project,
  selection: state.scene.selection,
  nodes: nodesWithParameters(state),
  links: linksWithPorts(state),
  stickies: stickies(state),
});

const mapDispatchToProps = (dispatch) => ({
  addGrammar: (grammar) => dispatch(addGrammar(grammar)),
  addLink: (link) => dispatch(addLink(link)),
  addNode: (node) => dispatch(addNode(node)),
  addSticky: (sticky) => dispatch(addSticky(sticky)),
  deleteNode: (nodeId) => dispatch(deleteNode(nodeId)),
  deleteLink: (linkId) => dispatch(deleteLink(linkId)),
  clickItem: () => dispatch(clickItem()),
  updateLoadingPercent: (percent) => dispatch(updateLoadingPercent(percent)),
  updateNode: (nodeId, offset) => dispatch(updateNode(nodeId, offset)),
  addToolboxNodes: (toolbox) => dispatch(addToolboxNodes(toolbox)),
  clearDatabase: () => dispatch(clearDatabase()),
});

const CanvasContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {forwardRef: true}
)(Canvas);

export default CanvasContainer;
