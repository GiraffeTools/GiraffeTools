import { connect } from "react-redux";

import SmallScreenAlert from "../components/smallScreenAlert";
import { toggleSmallScreenAlert } from "../actions";

const mapStateToProps = state => ({
  closed: state.alerts.smallScreen
});

const mapDispatchToProps = dispatch => ({
  toggleSmallScreenAlert: () => dispatch(toggleSmallScreenAlert())
});

const SmallScreenAlertContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmallScreenAlert);

export default SmallScreenAlertContainer;
