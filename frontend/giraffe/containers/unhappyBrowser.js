import {connect} from 'react-redux';

import UnhappyBrowser from '../components/unhappyBrowser';
import {toggleBrowserAlert} from '../actions';

const mapStateToProps = (state) => ({
  open: state.alerts.incompatibleBrowser,
});

const mapDispatchToProps = (dispatch) => ({
  toggleBrowserAlert: () => dispatch(toggleBrowserAlert()),
});

const UnhappyBrowserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnhappyBrowser);

export default UnhappyBrowserContainer;
