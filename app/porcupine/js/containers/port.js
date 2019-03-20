import { connect } from "react-redux";

import Port from "../components/canvas/port";
import { addLink, hoverPort, startLink, updateParameter } from "../actions";

const mapStateToProps = state => ({
  hoveredPort: state.scene.hoveredPort,
  selectedLinks: state.scene.selection && state.scene.selection.links
});

const mapDispatchToProps = dispatch => ({
  hoverPort: (portId, type) => dispatch(hoverPort(portId, type)),
  addLink: props => dispatch(addLink(props)),
  startLink: portId => dispatch(startLink(portId)),
  setPortRefs: (portId, inputPortRef, outputPortRef) =>
    dispatch(updateParameter(portId, { inputPortRef, outputPortRef }))
});

const PortContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Port);

export default PortContainer;
