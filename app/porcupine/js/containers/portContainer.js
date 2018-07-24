import { connect } from 'react-redux';

import Port from '../components/port';
import {
  addLink,
  startLink,
  updatePort,
} from '../actions';

const mapStateToProps = state => ({
  linkInConstruction: state.scene.linkInConstruction,
})

const mapDispatchToProps = dispatch => ({
  addLink: (props) => dispatch(addLink(props)),
  startLink: (props) => dispatch(startLink(props)),
  setPortRefs: (portId, inputPortRef, outputPortRef) => dispatch(updatePort(portId, { inputPortRef, outputPortRef } )),
});

const PortContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Port);

export default PortContainer;
