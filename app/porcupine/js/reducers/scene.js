import {
  ZOOM_IN,
  ZOOM_OUT,
  HOVER_NODE,
  CLICK_NODE,
  CLICK_SCENE,
  ADD_LINK,
  CONNECT_LINK,
  REMOVE_LINK,
  SET_MOUSE_STATE,
} from '../actions/actionTypes';

export default function scene(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case ZOOM_IN:
      return state;
    case ZOOM_OUT:
      return state;
    case HOVER_NODE:
      return {...state, hoveredNode: payload.nodeId};
    case CLICK_NODE:
      return {...state, selectedNode: payload.nodeId === state.selectedNode ? null : payload.nodeId};
    case CLICK_SCENE:
      return {...state, selectedNode: null};
    case ADD_LINK:
      return {...state, constructedLink: payload.linkId};
    case CONNECT_LINK:
      return {...state, constructedLink: null};
    case REMOVE_LINK:
      return {...state, constructedLink: null};
    case SET_MOUSE_STATE:
    return {...state, mouseState: payload};
    default:
      return state;
  }
  return state;
}
