import {connect} from 'react-redux';

import LoginButton from '../components/loginButton';

const mapStateToProps = (state) => ({
  user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({});

const LoginButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginButton);

export default LoginButtonContainer;
