import { connect } from "react-redux";

import Project from "../components/project";

import { openModal } from "../../../porcupine/js/actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  openModal: props => dispatch(openModal(props))
});

const ProjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);

export default ProjectContainer;
