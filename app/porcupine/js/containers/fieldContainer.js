import { connect } from "react-redux";

import Field from "../components/field";
import {
  removeParameter,
  removeParameterFromNode,
  deleteParameter,
  updateParameter,
  repositionPorts
} from "../actions";
import { selectedNode } from "../selectors/selectors";

const mapStateToProps = state => ({
  selectedNode: selectedNode(state)
});

const mapDispatchToProps = dispatch => ({
  removeParameter: id => dispatch(deleteParameter(id)),
  repositionPorts: nodeId => dispatch(repositionPorts(nodeId)),
  updateParameter: (portId, newValues) =>
    dispatch(updateParameter(portId, newValues))
});

const FieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);

export default FieldContainer;
