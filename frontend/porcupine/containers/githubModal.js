import { connect } from "react-redux";

import GithubModal from "../components/modals/githubModal";
import { closeModal } from "../actions";

const mapStateToProps = state => ({
  auth: state.auth,
  project: state.project
});

const mapDispatchToProps = dispatch => ({
  closeModal: id => dispatch(closeModal(id))
});

const GithubModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GithubModal);

export default GithubModalContainer;
