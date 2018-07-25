import { connect } from 'react-redux';

import Sidebar from '../components/sidebar';
import {
  toggleSidebar
} from '../actions';


const mapStateToProps = state => ({
  showSidebar: state.ui.showSidebar,
})

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => dispatch(toggleSidebar()),
});

const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

export default SidebarContainer;
