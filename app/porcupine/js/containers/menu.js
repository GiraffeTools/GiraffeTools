import { connect } from "react-redux";

import Menu from "../components/menu";
import {
  addNode,
  deleteLink,
  deleteNode,
  clearDatabase,
  copyItems,
  pasteNodes,
  updateNode
} from "../actions";
import { copiedNodes } from "../selectors/selectors";

const mapStateToProps = state => ({
  selection: state.scene.selection,
  copyNodes: state.scene.copyNodes,
  copiedNodes: copiedNodes(state)
});

const mapDispatchToProps = dispatch => ({
  addNode: node => dispatch(addNode(node)),
  copyItems: nodeIds => dispatch(copyItems(nodeIds)),
  pasteNodes: nodeIds => dispatch(pasteNodes(nodeIds)),
  deleteNode: nodeId => dispatch(deleteNode(nodeId)),
  deleteLink: linkId => dispatch(deleteLink(linkId)),
  clearDatabase: () => dispatch(clearDatabase()),
  updateNode: (nodeId, offset) => dispatch(updateNode(nodeId, offset))
});

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

export default MenuContainer;
