import { connect } from "react-redux";

import Sidebar from "../components/sidebar";

import { openModal, toggleToolbox } from "../actions";
import {
  nodesWithParameters,
  linksWithPortsAndNodes
} from "../selectors/selectors";

const mapStateToProps = state => ({
  project: state.project,
  showSidebar: state.ui.showSidebar,
  searchText: state.ui.searchText,
  showToolboxes: state.ui.showToolboxes,
  nodes: nodesWithParameters(state),
  links: linksWithPortsAndNodes(state)
});

const mapDispatchToProps = dispatch => ({
  toggleToolbox: toolbox => dispatch(toggleToolbox(toolbox)),
  openModal: props => dispatch(openModal(props))
});

const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

export default SidebarContainer;
