import { connect } from "react-redux";

import Content from "../components/content";
import {
  toggleSidebar,
  setUser,
  setRepository,
  setBranch,
  setCommit
} from "../actions";
import {
  hoveredNode,
  nodesWithParameters,
  linksWithPorts
} from "../selectors/selectors";

const mapStateToProps = state => ({
  showSidebar: state.ui.showSidebar,
  user: state.user,
  modals: state.modals,
  hoveredNode: hoveredNode(state)
});

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => dispatch(toggleSidebar()),
  setUser: user => dispatch(setUser(user)),
  setRepository: repository => dispatch(setRepository(repository)),
  setBranch: branch => dispatch(setBranch(branch)),
  setCommit: commit => dispatch(setCommit(commit))
});

const ContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);

export default ContentContainer;
