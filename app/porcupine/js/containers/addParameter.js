import { connect } from "react-redux";

import AddParameter from "../components/addParameter";
import { addParameterToNode } from "../actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addParameterToNode: (parameter, nodeId) =>
    dispatch(addParameterToNode(parameter, nodeId))
});

const AddParameterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddParameter);

export default AddParameterContainer;
