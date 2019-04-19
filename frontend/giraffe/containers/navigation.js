import { connect } from "react-redux";

import Navigation from "../components/navigation";

const mapStateToProps = state => ({
  user: state.auth
});

const mapDispatchToProps = dispatch => ({});

const NavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);

export default NavigationContainer;
