import {connect} from 'react-redux';

import Content from '../components/content';
import {
  setUser,
  setRepository,
  setBranch,
  setCommit,
  updateAuth,
} from '../actions';

const mapStateToProps = (state) => ({
  project: state.project,
  modals: state.modals,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  setRepository: (repository) => dispatch(setRepository(repository)),
  setBranch: (branch) => dispatch(setBranch(branch)),
  setCommit: (commit) => dispatch(setCommit(commit)),
  updateAuth: (user) => dispatch(updateAuth(user)),
});

const ContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Content);

export default ContentContainer;
