import {
  ZOOM_IN,
  ZOOM_OUT,
  HOVER_NODE,
  CLICK_NODE,
  CLICK_SCENE ,
} from '../actions/actionTypes';

export default function scene(state = [], action) {
  switch (action.type) {
    case ZOOM_IN:
      return state;
    case ZOOM_OUT:
      return state;
    case HOVER_NODE:
      return {...state, hoveredNode: action.payload.nodeId};
    case CLICK_NODE:
      return {...state, selectedNode: action.payload.nodeId === state.selectedNode ? null : action.payload.nodeId};
    case CLICK_SCENE:
      return {...state, selectedNode: null};
    default:
      return state;
  }
  return state;
}
