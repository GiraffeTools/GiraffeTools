import { connect } from "react-redux";

import LoadData from "../utils/loadData";
import {
  addNode,
  addLink,
  clearDatabase,
  setUser,
  setRepository,
  repositionPorts,
  updateLoadingPercent
} from "../actions";
import { nodesWithPorts, linksWithPorts } from "../selectors/selectors";

const mapStateToProps = state => ({
  loadingPercent: state.ui.loadingPercent,
  nodes: nodesWithPorts(state),
  links: linksWithPorts(state)
});

const mapDispatchToProps = dispatch => ({
  addNode: node => dispatch(addNode(node)),
  addLink: link => dispatch(addLink(link)),
  repositionPorts: node => dispatch(repositionPorts(node)),
  clearDatabase: () => dispatch(clearDatabase()),
  updateLoadingPercent: percent => dispatch(updateLoadingPercent(percent)),
  setUser: user => dispatch(setUser(user)),
  setRepository: repository => dispatch(setRepository(repository))
});

const LoadDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadData);

export default LoadDataContainer;
