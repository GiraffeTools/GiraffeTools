import { connect } from 'react-redux';

import ParameterPane from '../components/parameterPane';
import {
  clickNode,
  deleteNode,
} from '../actions';
import {
	selectedNode,
} from '../selectors/selectors';


const mapStateToProps = state => ({
  selectedNode: selectedNode(state),
});

const mapDispatchToProps = dispatch => ({
  deleteNode: (node) => dispatch(deleteNode(node)),
  clickNode: (nodeId) => dispatch(clickNode(nodeId)),
});

const ParameterPaneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterPane);

export default ParameterPaneContainer;
