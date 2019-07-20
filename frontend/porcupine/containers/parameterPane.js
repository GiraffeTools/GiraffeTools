import { connect } from "react-redux";

import ParameterPane from "../components/parameters/parameterPane";
import { clickItem } from "../actions";
import { selection } from "../selectors/selectors";

const mapStateToProps = state => ({
  selection: selection(state)
});

const mapDispatchToProps = dispatch => ({
  clickItem: (id, type) => dispatch(clickItem(id, type))
});

const ParameterPaneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterPane);

export default ParameterPaneContainer;
