import { connect } from "react-redux";

import AddParameter from "../components/addParameter";
import { addParameterToNode, repositionPorts } from "../actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addParameterToNode: (parameter, nodeId) =>
    dispatch(addParameterToNode(parameter, nodeId)),
  repositionPorts: node => dispatch(repositionPorts(node))
});

const AddParameterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddParameter);

export default AddParameterContainer;
