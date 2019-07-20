import {connect} from 'react-redux';

import User from '../pages/user';

const mapStateToProps = (state) => ({
  access_token: state.auth.access_token,
});

const mapDispatchToProps = (dispatch) => ({});

const UserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(User);

export default UserContainer;
