import { connect } from "react-redux";

import Sidebar from "../components/sidebar";

import { openModal } from "../actions";
import {
  nodesWithParameters,
  linksWithPortsAndNodes
} from "../selectors/selectors";

const mapStateToProps = state => ({
  project: state.project,
  showSidebar: state.ui.showSidebar,
  nodes: nodesWithParameters(state),
  links: linksWithPortsAndNodes(state)
});

const mapDispatchToProps = dispatch => ({
  openModal: props => dispatch(openModal(props))
});

const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

export default SidebarContainer;
