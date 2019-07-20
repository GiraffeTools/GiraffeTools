import {connect} from 'react-redux';

import Modals from '../components/modals/modals';
import {closeModal} from '../actions';

const mapStateToProps = (state) => ({
  modals: state.modals.modals,
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: (id) => dispatch(closeModal(id)),
});

const ModalsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Modals);

export default ModalsContainer;
