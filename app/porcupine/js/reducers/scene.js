import {
  ZOOM_IN,
  ZOOM_OUT,
  HOVER_NODE,
  CLICK_NODE,
  CLICK_SCENE,
  ADD_LINK,
  CONNECT_LINK,
  REMOVE_LINK,
  START_LINK ,
  SET_MOUSE_STATE,
} from '../actions/actionTypes';

export default function scene(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case ZOOM_IN:
      return {state, zoomLevel: state.zoomLevel *= 1.25};
    case ZOOM_OUT:
      return {state, zoomLevel: state.zoomLevel *= 0.8};
    case HOVER_NODE:
      return {...state, hoveredNode: payload.nodeId};
    case CLICK_NODE:
      return {...state, selectedNode: payload.nodeId === state.selectedNode ? null : payload.nodeId};
    case CLICK_SCENE:
      return {...state, selectedNode: null};
    case START_LINK:
      return {...state, linkInConstruction: {port: payload.port, startingAt: payload.startingAt} };
    case ADD_LINK:
      return {...state, linkInConstruction: null};
    case REMOVE_LINK:
      return {...state, linkInConstruction: null};
    // case SET_MOUSE_STATE:
      // return {...state, mouseState: payload};
    default:
      return state;
  }
  return state;
}
