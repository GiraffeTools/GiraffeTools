import { connect } from "react-redux";

import Field from "../components/parameters/field";
import { deleteParameter, updateParameter } from "../actions";
import { selectedNode } from "../selectors/selectors";

const mapStateToProps = state => ({
  selectedNode: selectedNode(state)
});

const mapDispatchToProps = dispatch => ({
  removeParameter: (id) => dispatch(deleteParameter(id)),
  updateParameter: (portId, newValues) =>
    dispatch(updateParameter(portId, newValues))
});

const FieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);

export default FieldContainer;
