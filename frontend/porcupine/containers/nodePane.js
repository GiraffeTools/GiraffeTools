import { connect } from "react-redux";

import NodePane from "../components/parameters/nodePane";
import { deleteNode, updateNode } from "../actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  deleteNode: id => dispatch(deleteNode(id)),
  updateNode: (id, name) => dispatch(updateNode(id, name))
});

const NodePaneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NodePane);

export default NodePaneContainer;
