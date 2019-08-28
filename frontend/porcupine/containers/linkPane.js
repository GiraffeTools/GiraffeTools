import {connect} from 'react-redux';

import LinkPane from '../components/parameters/linkPane';
import {deleteLink} from '../actions';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  deleteLink: (id) => dispatch(deleteLink(id)),
});

const LinkPaneContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LinkPane);

export default LinkPaneContainer;
