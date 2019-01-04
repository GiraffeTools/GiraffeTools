import { connect } from "react-redux";

import SaveModal from "../components/saveModal";
import { closeModal } from "../actions";
import {
  nodesWithParameters,
  linksWithPortsAndNodes
} from "../selectors/selectors";

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  nodes: nodesWithParameters(state),
  links: linksWithPortsAndNodes(state)
});

const mapDispatchToProps = dispatch => ({
  closeModal: id => dispatch(closeModal(id))
});

const SaveModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveModal);

export default SaveModalContainer;
