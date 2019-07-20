import {connect} from 'react-redux';

import Link from '../components/canvas/link';
import {clickItem, deleteLink} from '../actions';

const mapStateToProps = (state) => ({
  selectedLinks: state.scene.selection && state.scene.selection.links,
});

const mapDispatchToProps = (dispatch) => ({
  clickItem: (linkId, type) => dispatch(clickItem(linkId, type)),
  deleteLink: (linkId) => dispatch(deleteLink(linkId)),
});

const LinkContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);

export default LinkContainer;
