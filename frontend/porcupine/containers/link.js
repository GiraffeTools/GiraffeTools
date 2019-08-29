import {connect} from 'react-redux';

import Link from '../components/canvas/link';
import {clickItem, deleteLink, setDragging} from '../actions';

const mapStateToProps = (state) => ({
  selectedLinks: state.scene.selection && state.scene.selection.links,
  dragging: state.scene.dragging,
});

const mapDispatchToProps = (dispatch) => ({
  clickItem: (linkId, type) => dispatch(clickItem(linkId, type)),
  deleteLink: (linkId) => dispatch(deleteLink(linkId)),
  setDragging: (dragging) => dispatch(setDragging(dragging)),
});

const LinkContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);

export default LinkContainer;
