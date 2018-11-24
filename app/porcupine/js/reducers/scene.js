import {
  ZOOM_IN,
  ZOOM_OUT,
  HOVER_PORT,
  CLICK_ITEM,
  REMOVE_NODE,
  SET_MOUSE_STATE
} from "../actions/actionTypes";

const INITIAL_STATE = {
  hoveredPort: null,
  selection: {
    links: null,
    nodes: null
  }
};

export default function scene(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case ZOOM_IN:
      return state;
    case ZOOM_OUT:
      return state;
    case HOVER_PORT:
      return {
        ...state,
        hoveredPort: { id: payload.portId, type: payload.type }
      };
    case REMOVE_NODE:
      return {
        ...state,
        selection: {
          links: state.selection.links,
          nodes: null
        }
      };
    case CLICK_ITEM:
      const selection = {
        nodes:
          payload.item === "node" &&
          !(
            state.selection.nodes &&
            state.selection.nodes.includes(payload.id) &&
            state.selection.nodes.length == 1
          )
            ? [payload.id]
            : null,
        links:
          payload.item === "link" &&
          !(
            state.selection.links &&
            state.selection.links.includes(payload.id) &&
            state.selection.links.length == 1
          )
            ? [payload.id]
            : null
      };
      return { ...state, selection };
    default:
      return state;
  }
  return state;
}
