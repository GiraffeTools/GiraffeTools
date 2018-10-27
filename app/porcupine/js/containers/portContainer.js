import { connect } from "react-redux";

import Port from "../components/port";
import { hoveredPort } from "../selectors/selectors";
import { addLink, hoverPort, startLink, updatePort } from "../actions";

const mapStateToProps = state => ({
  hoveredPort: hoveredPort(state)
});

const mapDispatchToProps = dispatch => ({
  hoverPort: portId => dispatch(hoverPort(portId)),
  addLink: props => dispatch(addLink(props)),
  startLink: portId => dispatch(startLink(portId)),
  setPortRefs: (portId, inputPortRef, outputPortRef) =>
    dispatch(updatePort(portId, { inputPortRef, outputPortRef }))
});

const PortContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Port);

export default PortContainer;
