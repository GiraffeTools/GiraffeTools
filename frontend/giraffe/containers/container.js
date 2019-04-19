import { connect } from "react-redux";

import Main from "../components/main";
import { updateAuth } from "../actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  updateAuth: user => dispatch(updateAuth(user))
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default Container;
