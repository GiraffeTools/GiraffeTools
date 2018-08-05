import { connect } from 'react-redux';

import panZoomView from '../components/panZoomView';
import {
  zoomIn,
  zoomOut,
} from '../actions';


const mapStateToProps = state => ({
  zoomLevel: state.ui.zoomLevel,
})

const mapDispatchToProps = dispatch => ({
	zoomIn: () => dispatch(zoomIn()),
	zoomOut: () => dispatch(zoomOut()),
});

const CanvasContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(PanZoomView);

export default PanZoomViewContainer;
