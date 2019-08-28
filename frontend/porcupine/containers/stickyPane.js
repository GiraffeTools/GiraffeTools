import {connect} from 'react-redux';

import StickyPane from '../components/parameters/stickyPane';
import {updateSticky, deleteSticky} from '../actions';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  deleteSticky: (id) => dispatch(deleteSticky(id)),
  updateSticky: (id, name) => dispatch(updateSticky(id, name)),
});

const StickyPaneContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(StickyPane);

export default StickyPaneContainer;
