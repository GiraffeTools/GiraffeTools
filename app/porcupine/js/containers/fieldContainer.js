import { connect } from 'react-redux';

import Field from '../components/field';
import {
	removePort,
  removePortFromNode,
  deletePort,
  updatePort,
	repositionPorts,
} from '../actions';
import {
	selectedNode,
} from '../selectors/selectors';


const mapStateToProps = state => ({
  selectedNode: selectedNode(state),
})

const mapDispatchToProps = dispatch => ({
  removePort: (id) => dispatch(deletePort(id)),
	repositionPorts: (nodeId) => dispatch(repositionPorts(nodeId)),
  updatePort: (portId, newValues) => dispatch(updatePort(portId, newValues)),
});

const FieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);

export default FieldContainer;
