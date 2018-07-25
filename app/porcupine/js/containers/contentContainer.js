import { connect } from 'react-redux';

import Content from '../components/content';
import {
  toggleSidebar,
} from '../actions';
import {
	hoveredNode,
} from '../selectors/selectors';
import nodeData from '../../static/assets/nipype.json';


const mapStateToProps = state => ({
  showSidebar: state.ui.showSidebar,
  hoveredNode: hoveredNode(state),
})

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => dispatch(toggleSidebar()),
});

const ContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content)

export default ContentContainer;
