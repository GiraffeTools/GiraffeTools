import { connect } from "react-redux";

import ParameterPane from "../components/parameterPane";
import { clickItem, deleteNode, updateNode } from "../actions";
import { selectedNode } from "../selectors/selectors";

const mapStateToProps = state => ({
  selectedNode: selectedNode(state)
});

const mapDispatchToProps = dispatch => ({
  deleteNode: nodeId => dispatch(deleteNode(nodeId)),
  clickItem: (nodeId, type) => dispatch(clickItem(nodeId, type)),
  updateNode: (nodeId, name) => dispatch(updateNode(nodeId, name))
});

const ParameterPaneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterPane);

export default ParameterPaneContainer;
