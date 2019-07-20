import { connect } from "react-redux";

import Sidebar from "../components/sidebar/sidebar";

import { openModal, addToolboxNodes } from "../actions";

const mapStateToProps = state => ({
  project: state.project,
  showSidebar: state.ui.showSidebar,
  searchText: state.ui.searchText,
  showToolboxes: state.ui.showToolboxes,
  allNodes: state.ui.toolboxes
});

const mapDispatchToProps = dispatch => ({
  addToolboxNodes: (toolbox) => dispatch(addToolboxNodes(toolbox)),
  openModal: (props) => dispatch(openModal(props))
});

const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

export default SidebarContainer;
