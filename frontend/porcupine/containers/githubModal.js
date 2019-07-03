import { connect } from "react-redux";

import GithubModal from "../components/modals/githubModal";
import { closeModal } from "../actions";
import {
  nodesWithParameters,
  linksWithPortsAndNodes
} from "../selectors/selectors";

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
