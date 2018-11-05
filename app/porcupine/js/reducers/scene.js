import {
  ZOOM_IN,
  ZOOM_OUT,
  HOVER_NODE,
  HOVER_PORT,
  CLICK_NODE,
  CLICK_SCENE,
  SET_MOUSE_STATE
} from "../actions/actionTypes";

const INITIAL_STATE = {
  hoveredNode: null,
  hoveredPort: null,
  selectedNode: null
};

export default function scene(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case ZOOM_IN:
      return state;
    case ZOOM_OUT:
      return state;
    case HOVER_NODE:
      return { ...state, hoveredNode: payload.nodeId };
    case HOVER_PORT:
      return {
        ...state,
        hoveredPort: { id: payload.portId, type: payload.type }
      };
    case CLICK_NODE:
      return {
        ...state,
        selectedNode:
          payload.nodeId === state.selectedNode ? null : payload.nodeId
      };
    case CLICK_SCENE:
      return { ...state, selectedNode: null };
    default:
      return state;
  }
  return state;
}
