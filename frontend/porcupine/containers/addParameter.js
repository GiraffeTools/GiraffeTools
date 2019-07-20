import {connect} from 'react-redux';

import AddParameter from '../components/parameters/addParameter';
import {addParameterToNode, updateNode} from '../actions';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addParameterToNode: (parameter, nodeId) =>
    dispatch(addParameterToNode(parameter, nodeId)),
  updateNode: (nodeId, offset) => dispatch(updateNode(nodeId, offset)),
});

const AddParameterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddParameter);

export default AddParameterContainer;
