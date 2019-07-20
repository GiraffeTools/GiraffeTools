import {connect} from 'react-redux';

import ToolboxModal from '../components/modals/toolboxModal';
import {toggleToolbox} from '../actions';

const mapStateToProps = (state) => ({
  toolboxes: state.ui.toolboxes,
  showToolboxes: state.ui.showToolboxes,
});

const mapDispatchToProps = (dispatch) => ({
  toggleToolbox: (toolbox) => dispatch(toggleToolbox(toolbox)),
});

const ToolboxModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolboxModal);

export default ToolboxModalContainer;
