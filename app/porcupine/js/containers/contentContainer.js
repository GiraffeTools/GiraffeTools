import { connect } from "react-redux";

import Content from "../components/content";
import {
  toggleSidebar,
  setUser,
  setRepository,
  setBranch,
  setCommit
} from "../actions";
import { hoveredNode } from "../selectors/selectors";
import nodeData from "../../static/assets/nipype.json";

const mapStateToProps = state => ({
  showSidebar: state.ui.showSidebar,
  user: state.user,
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
