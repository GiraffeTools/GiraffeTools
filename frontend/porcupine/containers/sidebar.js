import {connect} from 'react-redux';

import Sidebar from '../components/sidebar/sidebar';

import {
  toggleSidebar,
  openModal,
  addToolboxNodes,
} from '../actions';

const mapStateToProps = (state) => ({
  project: state.project,
  searchText: state.ui.searchText,
  showToolboxes: state.ui.showToolboxes,
  allNodes: state.ui.toolboxes,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar: () => dispatch(toggleSidebar()),
  addToolboxNodes: (toolbox) => dispatch(addToolboxNodes(toolbox)),
  openModal: (props) => dispatch(openModal(props)),
});

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {forwardRef: true}
)(Sidebar);

export default SidebarContainer;
