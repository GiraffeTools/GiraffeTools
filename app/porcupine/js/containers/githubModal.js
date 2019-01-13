import { connect } from "react-redux";

import GithubModal from "../components/githubModal";
import { closeModal } from "../actions";

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  closeModal: id => dispatch(closeModal(id))
});

const GithubModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GithubModal);

export default GithubModalContainer;
