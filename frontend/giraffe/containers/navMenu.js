import {connect} from 'react-redux';

import NavMenu from '../components/navMenu';

const mapStateToProps = (state) => ({
  user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({});

const NavMenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavMenu);

export default NavMenuContainer;
