import { connect } from "react-redux";

import Navigation from "../components/navigation";
import { toggleNavigation } from "../actions";

const mapStateToProps = state => ({
  showNavigation: state.ui.showNavigation
});

const mapDispatchToProps = dispatch => ({
  toggleNavigation: () => dispatch(toggleNavigation())
});

const NavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);

export default NavigationContainer;
