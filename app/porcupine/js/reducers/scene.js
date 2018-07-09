import {
  ZOOM_IN,
  ZOOM_OUT,
  HOVER_NODE,
  CLICK_NODE,
} from '../actions/actionTypes';

export default function scene(state = [], action) {
  switch (action.type) {
    case ZOOM_IN:
      return state;
    case ZOOM_OUT:
      return state;
    case HOVER_NODE:
      console.log('hover');
      return {...state, hoveredNode: action.nodeId};
    case CLICK_NODE:
      console.log('click');
      return {...state, clickedNode: action.nodeId};
    default:
      return state;
  }
  return state;
}
