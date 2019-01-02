import { connect } from "react-redux";

import Sidebar from "../components/sidebar";

import { openModal } from "../actions";

const mapStateToProps = state => ({
  showSidebar: state.ui.showSidebar,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  openModal: props => dispatch(openModal(props))
});

const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

export default SidebarContainer;
