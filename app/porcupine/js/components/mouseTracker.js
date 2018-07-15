import { connect } from 'react-redux';
import React from 'react';

import {
  setMouseState,
} from '../actions/index';

const MouseTracker = (props) => {
  // All mouse variables:
  // const {
  //   detectedEnvironment: {
  //     isMouseDetected = false,
  //     isTouchDetected = false
  //   } = {},
  //   elementDimensions: {
  //     width = 0,
  //     height = 0
  //   } = {},
  //   isActive = false,
  //   isPositionOutside = false,
  //   position: {
  //     x = 0,
  //     y = 0
  //   } = {}
  // } = props;
  //
  props.setMouseState({position: props.position});
  return '';
};


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
	setMouseState: (state) => dispatch(setMouseState(state)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MouseTracker);
