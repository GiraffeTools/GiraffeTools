import {
  ZOOM_IN,
  ZOOM_OUT,
  ADD_NODE,
  HOVER_PORT,
  CLICK_ITEM,
  COPY_NODES,
  SET_MOUSE_STATE,
  REMOVE_LINK,
  REMOVE_NODE,
  REMOVE_STICKY
} from "../actions/actionTypes";

const EMPTY_SELECTION = {
  links: null,
  nodes: null,
  stickies: null
};
const INITIAL_STATE = {
  hoveredPort: null,
  selection: EMPTY_SELECTION,
  copyNodes: null
};

export default function scene(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case ZOOM_IN:
      return state;
    case ZOOM_OUT:
      return state;
    case ADD_NODE:
      return {
        ...state,
        selection: { nodes: [payload.id], links: null, stickies: null }
      };
    case HOVER_PORT:
      return {
        ...state,
        hoveredPort: { id: payload.portId, type: payload.type }
      };
    case COPY_NODES:
      return { ...state, copyNodes: payload.nodeIds };
    case REMOVE_LINK:
    case REMOVE_NODE:
    case REMOVE_STICKY:
      return {
        ...state,
        selection: EMPTY_SELECTION
      };
    case CLICK_ITEM:
      const selection = {
        stickies:
          payload.item === "sticky" &&
          !(
            state.selection.stickies &&
            state.selection.stickies.includes(payload.id) &&
            state.selection.stickies.length == 1
          )
            ? [payload.id]
            : null,
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
}
