import {connect} from 'react-redux';

import ParameterPane from '../components/parameters/stickyPane';
import {updateSticky, deleteSticky} from '../actions';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  deleteSticky: (id) => dispatch(deleteSticky(id)),
  updateSticky: (id, name) => dispatch(updateSticky(id, name)),
});

const ParameterPaneContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ParameterPane);

export default ParameterPaneContainer;
