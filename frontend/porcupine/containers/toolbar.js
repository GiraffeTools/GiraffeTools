import { connect } from "react-redux";

import Toolbar from "../components/toolbar/giraffeToolbar";
import {
  addNode,
  deleteLink,
  deleteNode,
  clearDatabase,
  copyItems,
  updateNode,
  addSticky
} from "../actions";
import { copiedNodes } from "../selectors/selectors";

const mapStateToProps = state => ({
  selection: state.scene.selection,
  copyNodes: state.scene.copyNodes,
  copiedNodes: copiedNodes(state)
});

const mapDispatchToProps = dispatch => ({
  addNode: node => dispatch(addNode(node)),
  addSticky: sticky => dispatch(addSticky(sticky)),
  copyItems: nodeIds => dispatch(copyItems(nodeIds)),
  deleteNode: nodeId => dispatch(deleteNode(nodeId)),
  deleteLink: linkId => dispatch(deleteLink(linkId)),
  clearDatabase: () => dispatch(clearDatabase()),
  updateNode: (nodeId, offset) => dispatch(updateNode(nodeId, offset))
});

const ToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);

export default ToolbarContainer;
