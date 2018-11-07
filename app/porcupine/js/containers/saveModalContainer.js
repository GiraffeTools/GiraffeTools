import { connect } from "react-redux";

import SaveModal from "../components/saveModal";
import { closeModal } from "../actions";
import { nodesWithParameters, linksWithPorts } from "../selectors/selectors";

const mapStateToProps = state => ({
  user: state.user,
  nodes: nodesWithParameters(state),
  links: linksWithPorts(state)
});

const mapDispatchToProps = dispatch => ({
  closeModal: id => dispatch(closeModal(id))
});

const SaveModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveModal);

export default SaveModalContainer;
