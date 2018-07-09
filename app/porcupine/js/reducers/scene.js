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
      return {...state, hoveredNode: action.hoveredNode};
    case CLICK_NODE:
      return {...state, hoveredNode: action.clickedNode};
    default:
      return state;
  }
  return state;
}
