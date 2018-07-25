import { connect } from 'react-redux';

import Tooltip from '../components/tooltip';
import {
	hoveredNode,
} from '../selectors/selectors';


const mapStateToProps = state => ({
		hoveredNode: hoveredNode(state),
});

const TooltipContainer = connect(
  mapStateToProps,
)(Tooltip);

export default TooltipContainer;
