import { connect } from "react-redux";

import Content from "../components/content";
import {
  setUser,
  setRepository,
  setBranch,
  setCommit
} from "../actions";

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
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
